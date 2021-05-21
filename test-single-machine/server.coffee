'use strict'
# require '/local-app/src/app/app.module'
bodyParser = require 'body-parser'
compress = require 'compression'
http = require 'http'
methodOverride = require 'method-override'
express = require 'express'

# ngExpressEngine = require ('@nguniversal/express-engine')


app = express()

# app.engine('html', ngExpressEngine({}))
app.set 'views', __dirname + '/local-app/dist/local-app/'
app.engine('html', require('ejs').renderFile)

app.use express.static(__dirname + '/local-app/dist/local-app/', {maxAge: 8640000})

app.use(compress())
app.use(bodyParser.json({limit: '50mb'}))
app.use(bodyParser.urlencoded({limit: '50mb'}, extended: false))
app.use(methodOverride())
console.log "inside PDU local tester ... "

app.route('/').get (request, response) ->
  console.log "running from " + __dirname
  console.log "new GET Request to /..."
  response.render 'index.html'


locServ = http.createServer app
locServ.listen 4931, () ->
  console.log "Started the local PDU server now.... Waiting for your request..."
