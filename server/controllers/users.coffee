'use strict'

AbstractController = require('./abstract').AbstractController
PasswordHandler    = require('../util/password-handler').PasswordHandler
EncryptionHelper   = require('../util/encryption-helper').EncryptionHelper

exports.UsersController = class UsersController extends AbstractController
    constructor: ->
        super()
        @pwdHandler = new PasswordHandler
        @encryptionHelper = EncryptionHelper.getInstance()

    create: (userObject, handlerObject) ->
        @pwdHandler.hash userObject.password, (hashedPasswordError, hashedPassword) =>
            if hashedPasswordError?
                @continueWithHandler null, handlerObject, hashedPasswordError, null
            else
                userObject['password'] = hashedPassword
                @messageGenerator.generate userObject, (createUserMessageError, createUserMessage) =>
                    if createUserMessageError?
                        @continueWithHandler null, handlerObject, createUserMessageError, null
                    else
                        @mqm.sendMessage 'create-users-req', createUserMessage, (sendError, sendResult) =>
                            if sendError?
                                @continueWithHandler null, handlerObject, sendError, null
                            else
                                workerObject =
                                    controllerRef: @
                                    methodName: "completeCreate"
                                    handler: handlerObject
                                @workerManager.enqueue createUserMessage.messageId, workerObject, (enqueueError, enqueueResult) =>
                                    if enqueueError?
                                        @continueWithHandler null, handlerObject, enqueueError, null
                                    else
                                        console.log "Enqueued the user creation work. Waiting for the message from Micro service to proceed..."

    completeCreate: (creationError, creationRes, additionalArg, handlerObject) ->
        if creationError?
            @continueWithHandler null, handlerObject, creationError, null
        else
            @continueWithHandler "username", handlerObject, null, creationRes

    authenticate: (username, password, handlerObject) ->
        @messageGenerator.generate username, (authenticateUserMessageError, authenticateUserMessage) =>
            console.log "authentication:: message generator step"
            if authenticateUserMessageError?
                @continueWithHandler null, handlerObject, createUserMessageError, null
            else
                @mqm.sendMessage 'find-users-req', authenticateUserMessage, (findUserSendError, findUserSendResult) =>
                    console.log "authentication:: message send level"
                    if findUserSendError?
                        @continueWithHandler null, handlerObject, findUserSendError, null
                    else
                        @encryptionHelper.encryptText password, (encryptError, encryptedPassword) =>
                            console.log "authentication:: encryption level"
                            if encryptError?
                                @continueWithHandler null, handlerObject, encryptError, null
                            else
                                workerObject =
                                    controllerRef: @
                                    methodName: "completeAuthenticate"
                                    handler: handlerObject
                                    additionalArg: encryptedPassword
                                @workerManager.enqueue authenticateUserMessage.messageId, workerObject, (enqueueAuthenticateUserError, enqueueAuthenticateUserResult) =>
                                    if enqueueAuthenticateUserError?
                                        @continueWithHandler null, handlerObject, enqueueAuthenticateUserError, null
                                    else
                                        console.log "Enqueued the user authentication work for user authentication with id #{authenticateUserMessage.messageId}. Waiting for the message from Micro service to proceed..."

    completeAuthenticate: (findUserError, findUserRes, additionalArg, handlerObject) ->
        console.log "completing user authentication ..."
        if findUserError?
            console.log "oops! there was an error"
            @continueWithHandler null, handlerObject, findUserError, null
        else
            console.log "will first decrypt the user pwd"
            console.log "additionalArg is #{additionalArg}"
            @encryptionHelper.decryptText additionalArg, (decryptError, decryptedPassword) =>
                if decryptError?
                    @continueWithHandler null, handlerObject, decryptError, null
                else
                    console.log "will now verify the password ..."
                    @pwdHandler.verify decryptedPassword, findUserRes.userDetails.password, (authenticationError, authenticationResult) =>
                        console.log "handling authentication result ..."
                        if authenticationError?
                            console.log "authentication failed"
                            console.dir authenticationError
                            @continueWithHandler null, handlerObject, authenticationError, null
                        else if not authenticationResult
                            console.log "password was incorrect"
                            failedAuthenticationError = new Error "Error! the authentication for user #{handlerObject.username} has failed..."
                            @continueWithHandler null, handlerObject, failedAuthenticationError, null
                        else
                            console.log "the authentication succeeded"
                            delete findUserRes.password
                            console.log "the authentication was completed"
                            console.dir findUserRes
                            @continueWithHandler "username", handlerObject, null, findUserRes.userDetails
