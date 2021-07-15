'use strict'

# loading internal libraries
AbstractLocalRequestHandler = require('./abstract-local').AbstractLocalRequestHandler
UsersController = require('../controllers/users').UsersController
UserValidator = require('../validators/user').UserValidator

exports.UserRequestHandler = class UserRequestHandler
    _urhInstance = undefined

    @getInstance: ->
        _urhInstance ?= new _LocalUserRequestHangler

    class _LocalUserRequestHangler extends AbstractLocalRequestHandler
        constructor: ->
            super()
            @controller = new UsersController
            @validator = new UserValidator
            console.log "will print out the controller..."
            console.dir @controller

        authenticate: (request, response) ->
            console.log "from authenticate inside UserRequestHandler..."
            @validator.checkAndSanitizeForAuthentication request.body.username, (usernameError, validUsername) =>
                if usernameError?
                    response.status(400).json({message: "Bad Request!"})
                else
                    console.log "will proceed to the users controller"
                    handlerObject =
                        handlerRef: @
                        responseObject: response
                    @controller.authenticate validUsername, request.body.password, handlerObject
