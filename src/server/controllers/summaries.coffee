'use strict'

AbstractController = require('./abstract').AbstractController

exports.SummariesController = class SummariesController extends AbstractController

    constructor: ->
        super()

    getShortSummary: (handlerObject) ->
        @messageGenerator.generate 'short-summary', (shortSummaryMessageError, shortSummaryMessage) =>
            if shortSummaryMessageError?
                @continueWithHandler null, handlerObject, shortSummaryMessageError, null
            else
                @mqm.sendMessage 'summary-req', shortSummaryMessage, (shortSummarySendError, shortSummarySendResult) =>
                    if shortSummarySendError?
                        @continueWithHandler null, handlerObject, shortSummarySendError, null
                    else
                        workerObject =
                            controllerRef: @
                            methodName: "completeGetShortSummary"
                            handler: handlerObject
                        @workerManager.enqueue shortSummaryMessage.messageId, workerObject, (enqueueShortSummaryError, enqueueShortSummaryResult) =>
                            if enqueueShortSummaryError?
                                @continueWithHandler null, handlerObject, shortSummarySendError, null
                            else
                                console.log "Enqueued the get summary work. Waiting for the message from Micro service to proceed..."

    completeGetShortSummary: (shortSummaryError, shortSummaryResult, additionalArg, handlerObject) ->
        if shortSummaryError?
            @continueWithHandler null, handlerObject, shortSummaryError, null
        else
            @continueWithHandler null, handlerObject, null, shortSummaryResult
