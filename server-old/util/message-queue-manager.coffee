'use strict'

# load external libraries
kafka = require 'kafka-node'

# load internal libraries
MessageProducer = require('./message-producer').MessageProducer
MessageConsumer = require('./message-consumer').MessageConsumer
WorkerManager   = require('./worker-manager').WorkerManager

exports.MessageQueueManager = class MessageQueueManager
    _mqmInstance = undefined

    @getInstance: ->
        _mqmInstance ?= new _LocalMessageQueueManager

    class _LocalMessageQueueManager
        constructor: ->
            client = new kafka.KafkaClient({kafkaHost: process.env.KAFKA_BROKER_HOST || "localhost:9092"})
            @msgProducer = new MessageProducer client
            @consummer = new MessageConsumer client, WorkerManager.getInstance()

        sendMessage: (topic, message, callback) ->
            @msgProducer.send topic, message, (sendError, sendResult) ->
                callback sendError, sendResult