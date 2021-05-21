'use strict'

BodyRequestHandler = require('../route-handlers/body').BodyRequestHandler

module.exports = (app, uploader) ->
    app.route('/api/bos-senate/draft').post uploader.single('bos-draft'), (request, response) ->
        console.log "just received a POST request to /api/bos-senate/draft ..."
        BodyRequestHandler.getInstance().addDraft request, response

    # bos submit
    app.route('/api/bos-senate/bos-submit').post (request, response) ->
        console.log "new POST request /api/bos-senate/bos-suubmit ..."
        BodyRequestHandler.getInstance().submitToBOS request, response

    # faculty bos
    app.route('/api/bos-senate/faculty-bos-recommend').post uploader.single('faculty-bos'), (request, response) ->
        console.log "new POST request /api/bos-senate/faculty-bos-recommend ..."
        BodyRequestHandler.getInstance().addFacultyRecommendation request, response

    # start senate
    app.route('/api/bos-senate/start-senate').post (request, response) ->
        console.log "new POST request /api/bos-senate/start-senate ..."
        BodyRequestHandler.getInstance().startSenate request, response

    # apc
    app.route('/api/bos-senate/apc-recommend').post uploader.single('apc-recommendation'), (request, response) ->
        console.log "new POST request /api/bos-senate/apc-recommend ..."
        BodyRequestHandler.getInstance().addAPCRecommendation request, response

    # other faculty recommend
    app.route('/api/bos-senate/other-faculty-recommend').post uploader.single('other-faculty-recommendation'), (request, response) ->
        console.log "new POST request /api/bos-senate/other-faculty-recommend ..."
        BodyRequestHandler.getInstance().addOtherFacultyRecommendation request, response

    # final senate
    app.route('/api/bos-senate/final-senate').post uploader.single('final-senate-recommendation'), (request, response) ->
        console.log "new POST request /api/bos-senate/final-senate ..."
        BodyRequestHandler.getInstance().recordSenateFinalRecommendation request, response
