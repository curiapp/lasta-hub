'use strict'

exports.WorkerManager = class WorkerManager
    _wmInstance = undefined

    @getInstance: ->
        _wmInstance ?= new _LocalWorkerManager

    class _LocalWorkerManager

        dequeue: (messageId, operationError, operationRes) ->
            console.log "dequeueing a message for id #{messageId} ..."
            console.dir @workerDictionary
            if messageId?
                workerObject = @workerDictionary[messageId]
                if workerObject?
                    console.log "will handle the work..."
                    delete @workerDictionary[messageId]
                    workerObject.controllerRef[workerObject.methodName] operationError, operationRes, workerObject.additionalArg, workerObject.handler
                else
                    console.log "there was no worker associated with this object"
            else
                console.log "undefined message identifier..."

        enqueue: (messageId, workerObject, callback) ->
            console.log "enqueueing a message for id #{messageId} ..."
            oldworkerObject = @workerDictionary[messageId]
            if oldworkerObject?
                existingWorkerError = new Error "Error! An existing worker object is linked to message ID #{messageId}"
                callback existingWorkerError, null
            else
                @workerDictionary[messageId] = workerObject
                console.log "added an entry for messageId #{messageId} in worker dictionary"
                callback null, null

        constructor: ->
            @workerDictionary = {}
