'use strict'

# ################################################################
#  This is the main class of the server                          #
# ###############################################################

# define the execution environment
execEnv = process.env.NODE_ENV || 'development'

# loading external libraries
bodyParser           = require 'body-parser'
compress             = require 'compression'
cors                 = require 'cors'
express              = require 'express'
fs                   = require 'fs'
helmet               = require 'helmet'
http                 = require 'http'
methodOverride       = require 'method-override'
morgan               = require 'morgan'
multer               = require 'multer'
path                 = require 'path'

# loading internal libraries
ConfigurationManager = require('./util/config-manager').ConfigurationManager
MessageQueueManager  = require('./util/message-queue-manager').MessageQueueManager
storerOption         =
    destination: (req, file, cb) ->
        cb null, './uploads'
    filename: (req, file, cb) ->
        cb null, (file.originalname.split(" ")).join('')
limitOption =
    fileSize: 52428800
storer               = multer.diskStorage storerOption
uploader             = multer({ storage: storer, limits: limitOption })

# expiration time
oneDay = 8640000

# create the express application
app = express()

# set up view template
# app.set 'views', __dirname + '/../client/views'
# app.engine('html', require('ejs').renderFile)

app.set 'views', __dirname + '/../local-app/dist/local-app/'
app.engine('html', require('ejs').renderFile)

app.use express.static(__dirname + '/../local-app/dist/local-app/', {maxAge: 8640000})


# static files
# app.use express.static(__dirname + '/../client/public/', {maxAge: oneDay})

# setting file upload limit
# app.use(express.limit('5mb'))

# configure the express application
app.use(compress())
app.use(bodyParser.json({limit: '50mb'}))
app.use(bodyParser.urlencoded({limit: '50mb', extended: false}))
app.use(helmet())
# app.use(bodyParser.json())
app.use(methodOverride())
app.use(cors())

console.log "inside pdu server the current folder is #{__dirname}"

# create spdy server
server = http.createServer app

# insert api routes
require('./routes/users')(app)
require('./routes/summaries')(app)
require('./routes/need-analyses')(app, uploader)
require('./routes/curriculum-development')(app, uploader)
require('./routes/consultations')(app, uploader)
# require('./routes/curricula')(app, uploader)
require('./routes/reviews')(app, uploader)
require('./routes/inst-bodies')(app, uploader)
require('./routes/qualifications')(app, uploader)

# insert view routes
require('./routes/views')(app)

# create the message queue producers and consumers
MessageQueueManager.getInstance()

# serverPort
portNumber = ConfigurationManager.getInstance().getServerPort()
console.log "about to start listening to server... at " + __dirname
console.log "portNumber = " + portNumber

server.listen portNumber, () ->
    console.log "Curriculum development server now listening on port %d in mode %s", portNumber, app.settings.env
