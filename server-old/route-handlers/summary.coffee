'use strict'

# loading internal libraries
AbstractLocalRequestHandler = require('./abstract-local').AbstractLocalRequestHandler
SummariesController         = require('../controllers/summaries').SummariesController

exports.SummaryRequestHandler = class SummaryRequestHandle
    _srhInstance = undefined

    @getInstance: ->
        _srhInstance ?= new _LocalSummaryRequestHandler

    class _LocalSummaryRequestHandler extends AbstractLocalRequestHandler
        constructor: ->
            super()
            @controller = new SummariesController

        getShortVersion: (request, response) ->
            handlerObject =
                handlerRef: @
                responseObject: response
            @controller.getShortSummary handlerObject
