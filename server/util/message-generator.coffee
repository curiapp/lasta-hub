'use strict'

uuid = require 'uuid'

exports.MessageGenerator = class MessageGenerator
    _mGeneratorInstance = undefined

    @getInstance: ->
        _mGeneratorInstance ?= new _LocalMessageGenerator

    class _LocalMessageGenerator
        constructor: ->

        generate: (messageContent, callback) ->
            newMessageID = uuid.v4()
            messageObject =
                messageId: newMessageID
                content: messageContent
            callback null, messageObject
