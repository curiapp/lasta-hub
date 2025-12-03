'use strict'

SummaryRequestHandler = require('../route-handlers/summary').SummaryRequestHandler

module.exports = (app) ->
    # Get a short version of the summary
    app.route('/api/short-summary').get (request, response) ->
        console.log "new GET request to /api/short-summary ..."
        SummaryRequestHandler.getInstance().getShortVersion request, response
