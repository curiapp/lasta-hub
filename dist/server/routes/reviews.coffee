'use strict'

ReviewRequestHandler = require('../route-handlers/review').ReviewRequestHandler

module.exports = (app, uploader) ->

    # start review
    app.route('/api/reviews/start').post uploader.single('review-start'), (request, response) ->
        console.log "new POST request /api/reviews/start ..."
        ReviewRequestHandler.getInstance().startReview request, response

    # recommendations
    app.route('/api/reviews/recommend').post uploader.single('review-recommend'), (request, response) ->
        console.log "new POST request /api/reviews/recommend ..."
        ReviewRequestHandler.getInstance().recommend request, response
