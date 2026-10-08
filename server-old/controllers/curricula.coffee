'use strict'

AbstractController = require('./abstract').AbstractController

exports.CurriculaController = class CurriculaController extends AbstractController

    addDraft: (draftData, handlerObject) ->
        @messageGenerator.generate draftData, (draftDataMessageError, draftDataMessage) =>
            if draftDataMessageError?
                @continueWithHandler null, handlerObject, draftDataMessageError, null
            else
                @mqm.sendMessage 'curriculum-final-drat-req', draftDataMessage, (draftDataSendMessageError, draftDataSendMessageResult) =>
                    if draftDataSendMessageError?
                        @continueWithHandler null, handlerObject, draftDataSendMessageError, null
                    else
                        workerObject =
                            controllerRef: @
                            methodName: 'continueAddDraft'
                            handler: handlerObject
                        @workerManager.enqueue draftDataMessage.messageId, workerObject, (enqueueDraftDataError, enqueueDraftDataResult) =>
                            if enqueueDraftDataError?
                                @continueWithHandler null, handlerObject, enqueueDraftDataError, null
                            else
                                console.log "Enqueued the final curriculum draft submission. Waiting for the message from Microservice to proceed ..."

    constructor: ->
        super()
