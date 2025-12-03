'use strict'

kafka = require 'kafka-node'

exports.MessageProducer = class MessageProducer
    constructor: (client) ->
        @readyToSend = false
        @producer = new kafka.Producer client
        @producer.on 'ready', () =>
            console.log "Kafka producer ready...."
            @readyToSend = true
        @producer.on 'error', (prodError) =>
            console.log "An error occurred with message producer :: #{prodError}"

    send: (topicName, message, callback) ->
        if not @readyToSend
            console.log "producer not ready to send..."
            callback null, null
        else
            messageStr = JSON.stringify message
            messageOptions =
                topic: topicName
                messages: messageStr
                attributes: 0
            @producer.send [messageOptions], (sendError, sendResult) ->
                callback sendError, sendResult