'use strict'

kafka = require 'kafka-node'

exports.MessageConsumer = class MessageConsumer
    constructor: (client, wrkManager) ->
        @workerManager = wrkManager
        topicNames = ['create-users-res', 'find-users-res','summary-res', 'need-analysis-start-res',
        'need-analysis-conclude-res', 'need-analysis-consult-res', 'need-analysis-survey-res', 'need-analysis-bos-start-res',
        'need-analysis-bos-recommend-res', 'need-analysis-apc-recommend-res' ,'need-analysis-senate-start-res', 'need-analysis-senate-recommend-res','cur-dev-appoint-pac-res', 'cur-dev-draft-revise-res', 'cur-dev-draft-submit-res', 'cur-dev-draft-validate-res',
        'consult-start-pac-res', 'consult-benchmark-res', 'cur-dev-appoint-cdc-res', 'consult-final-draft-res',
        'consult-endorse-res', 'review-unit-start-res', 'review-unit-recommend-res']

        topicCol = topicNames.map (singleTopicName) ->
            currentTopicObj =
                topic: singleTopicName
            return currentTopicObj
        topicConf =
          groupId: 'pduappcons'
          autoCommit: true
          autoCommitIntervalMs: 2000
          fetchMinBytes: 1
          fromOffset: false
          fromBeginning: false
          encoding: 'utf8'

        @curConsumer = new kafka.Consumer client, topicCol, topicConf
        @curConsumer.on 'message', (newMessage) ->
            console.log "processing new message..."
            console.dir newMessage
            messageValue = JSON.parse(newMessage.value)
            console.dir messageValue
            currentMessageId = messageValue.messageId
            currentOperationError = null
            currentOperationError = new Error(messageValue.operationError) if messageValue.hasOwnProperty("operationError")
            currentOperationResult = messageValue.operationResult
            wrkManager.dequeue currentMessageId, currentOperationError, currentOperationResult

        @curConsumer.on 'error', (errMsg) ->
          console.log "there was an error in the kafka consumer..."
          console.dir errMsg

        @curConsumer.on 'offsetOutOfRange', (offsErr) ->
          console.log "there was an offset error in the kafka broker..."
          console.dir offsErr
