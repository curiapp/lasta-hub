'use strict'

MessageGenerator    = require('../util/message-generator').MessageGenerator
MessageQueueManager = require('../util/message-queue-manager').MessageQueueManager
WorkerManager       = require('../util/worker-manager').WorkerManager

exports.AbstractController = class AbstractController
    constructor: ->
        @mqm = MessageQueueManager.getInstance()
        @messageGenerator = MessageGenerator.getInstance()
        @workerManager = WorkerManager.getInstance()

    continueWithHandler: (tokenIssuerAttr, handlerObject, resultError, result) ->
        if tokenIssuerAttr?
            handlerObject.handlerRef["completeRequestHandlingWithToken"] tokenIssuerAttr, handlerObject.responseObject, resultError, result
        else
            handlerObject.handlerRef["completeRequestHandling"] handlerObject.responseObject, resultError, result
