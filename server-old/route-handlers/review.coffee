'use strict'

# loading internal libraries
AbstractLocalRequestHandler = require('./abstract-local').AbstractLocalRequestHandler
ReviewsController           = require('../controllers/reviews').ReviewsController
ReviewValidator             = require('../validators/review').ReviewValidator

exports.ReviewRequestHandler = class ReviewRequestHandler
    _rwrhInstance = undefined

    @getInstance: ->
        _rwrhInstance ?= new _LocalReviewRequestHandler

    class _LocalReviewRequestHandler extends AbstractLocalRequestHandler

        startReview: (request, response) ->
            @validator.checkAndSanitizeForStartup request.body, (reviewDataError, validReviewData) =>
                if reviewDataError?
                    response.status(400).json({message: "Bad Request adding a review!"})
                else
                    @repoManager.startReview validReviewData.devCode, request.file, (repositoryError, commitHash) =>
                        if repositoryError?
                            response.status(500).json({message: "Error adding initial review document to the repository"})
                        else
                            handlerObject =
                                handlerRef: @
                                responseObject: response
                            @controller.startReview validReviewData, handlerObject

        recommend: (request, response) ->
            @validator.checkAndSanitizeForRecommendation request.body, (reviewDataError, validReviewData) =>
                if reviewDataError?
                    response.status(400).json({message: "Bad Request recommending a review!"})
                else
                    @repoManager.recommendReview validReviewData.devCode, request.file, validReviewData.decision, (repositoryError, commitHash) =>
                        if repositoryError?
                            response.status(500).json({message: "Error adding review recommendation document to the repository"})
                        else
                            handlerObject =
                                handlerRef: @
                                responseObject: response
                            @controller.recommend validReviewData, handlerObject

        constructor: ->
            super()
            @controller = new ReviewsController
            @validator = new ReviewValidator
