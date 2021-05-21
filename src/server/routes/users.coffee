'use strict'

UserRequestHandler = require('../route-handlers/user').UserRequestHandler

module.exports = (app) ->
    # Create a new user
    app.route('/api/users').post (request, response) ->
        console.log "new POST request to /api/users..."
        UserRequestHandler.getInstance().create request, response

    # authenticate a user
    app.route('/api/users/authenticate').post (request, response) ->
        console.log "new POST request to /api/users/authenticate..."
        UserRequestHandler.getInstance().authenticate request, response
