'use strict'

CurriculumRequestHandler = require('../route-handlers/curriculum').CurriculumRequestHandler

module.exports = (app, uploader) ->
    # add draft
    app.route('/api/bos-senate/draft').post uploader.single('bos-start'), (request, response) ->
        console.log "new POST request /api/bos-senate/start ..."
        CurriculumRequestHandler.getInstance().addDraft request, response
