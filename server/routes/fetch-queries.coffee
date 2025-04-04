'use strict'
couchbase = require("couchbase")
async = require 'async'

clusterConnStr = "couchbase://#{process.env.DB_URL}"
username = 'admin'
password = 'password'
bucketName = 'yester-users'

cluster = null
bucket = null
collection = null

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

        (cb) ->
            try
                bucket = cluster.bucket(bucketName)
                collection = bucket.scope('_default').collection('_default')
                cb null
            catch err
                cb err
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

    app.route('/api/another').get (request, response) ->
        console.log "new GET request to /api/another ..."

        collection.get("palema")
            .then (data) ->
                console.log data, ' from db...'
                response.json data.content
            .catch (e) ->
                if e instanceof couchbase.DocumentNotFoundError
                    console.log "Document does not exist"
                    response.status(404).json msg: "Document not found"
                else
                    console.log "Error: " + e
                    response.status(500).json msg: "Internal Server Error"
