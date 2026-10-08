'use strict'

couchbase = require("couchbase")
async = require 'async'
fs     = require 'fs-extra'
path   = require 'path'
{ execSync, spawn } = require("child_process")
{ pipeline } = require 'stream/promises'


clusterConnStr = "couchbase://#{process.env.DB_URL}"
username = 'admin'
password = 'password'

cluster = null

initializeDatabase = (callback) ->
    async.series [
        (cb) ->
            couchbase.connect clusterConnStr,
                username: username
                password: password
            .then (conn) ->
                cluster = conn
                cb null
            .catch (err) -> cb err
    ], (err) ->
        if err
            console.error "Database initialization failed:", err
        else
            console.log "Database initialized successfully"
        callback? err

# Call the function
initializeDatabase()

module.exports = (app, uploader) ->
    # Get programmes
    app.route('/api/programmes').get (request, response) ->
        console.log "new GET request to /api/programmes ..."
        
        query = """
            SELECT * FROM \`yester-programmes\`._default._default 
        """

        options =  { parameters: [] }
        devCode = request.query.devCode

        if(devCode)
            query += "WHERE preProgComponent.devCode=$#{options.parameters.length + 1}"
            options.parameters.push(devCode) 

        cluster.query(query, options)
            .then (data) ->
                programmes = data.rows.map (row) -> row._default
                response.json programmes
            .catch (e) ->
                if e instanceof couchbase.DocumentNotFoundError
                    console.log "Document does not exist"
                    response.status(404).json msg: "Document not found"
                else
                    console.log "Error: " + e
                    response.status(500).json msg: "Internal Server Error"

    app.route('/api/need-analysis').get (request, response) ->
        console.log "new GET request to /api/need-analysis ..."

        if(!request.query.devCode)
            return response.status(400).json({message: "Bad Request getting need analysis!"})

        options =  { parameters: [request.query.devCode] }
        query = """
            SELECT * FROM \`yester-need-analyses\`._default._default 
            WHERE META(_default).id=$1
        """

        cluster.query(query, options)
            .then (data) ->
                needAnalysisObj = data.rows.map (row) -> row._default
                response.json needAnalysisObj
            .catch (e) ->
                if e instanceof couchbase.DocumentNotFoundError
                    console.log "Document does not exist"
                    response.status(404).json msg: "Document not found"
                else
                    console.log "Error: " + e
                    response.status(500).json msg: "Internal Server Error"

    app.route('/api/file').get (request, response) ->
        console.log "new GET request to /api/file ..."

        commitHash = request.query.hash

        if(!commitHash)
            return response.status(400).json({message: "Bad Request getting file!"})
        
        if (!/^[a-f0-9]{5,40}$/i.test(commitHash))
            return response.status(400).send('Invalid commit hash')

        stdout = execSync("cd #{process.env.MULTER_UPLOAD_DIR} && git ls-tree --name-only -r HEAD").toString()
        
        filePath = stdout.trim().split("\n")[0]

        ext = path.extname(filePath).toLowerCase()
        mimeTypes = {
            '.png': 'image/png',
            '.jpg': 'image/jpeg',
            '.jpeg': 'image/jpeg',
            '.gif': 'image/gif',
            '.svg': 'image/svg+xml',
        }

        response.setHeader('Content-Type', mimeTypes[ext] || 'application/octet-stream')

        git = spawn('git', ['show', "#{commitHash}:#{filePath}"], {
            cwd: process.env.MULTER_UPLOAD_DIR
        })

        git.stderr.on 'data', (data) => console.error("stderr: #{data}")

        git.on 'error', (err) => 
            console.error('Git command failed:', err)
            return response.status(500).send('Git command failed')

        git.on 'close', (code) => 
            if code != 0 
                console.error 'Git exited with error code', code
                try
                    response.destroy()  # best effort cancel
                catch e
                    console.error 'Failed to destroy response:', e  

        pipeline(git.stdout, response).catch (err) ->
            console.error 'Pipeline failed', err
            try
                response.destroy()
            catch e
                console.error 'Response destroy failed'
  

        # options = process.cwd()+"/uploads/kano/need-analysis/senate/"
        # fileName = "cp001-amend-approve.png"
        
        # git = simpleGit()
        # file = git.showBuffer(["#{options+fileName}"])
        # response.json file: file
            # .then((file) =>
            #     console.log("Got the file")
            #     response.json({ file })
            # )
            # .error (error) =>
            #     console.log("could not get the file ", error)
            #     return response.status(400).json({message: "Failed to fetch file!"})
            
        



