'use strict'

AbstractController = require('./abstract').AbstractController

exports.ReviewsController = class ReviewsController extends AbstractController
    constructor: ->
        super()

    startReview: (reviewData, handlerObject) ->
        @messageGenerator.generate reviewData, (reviewDataMessageError, reviewDataMessage) =>
            if reviewDataMessageError?
                @continueWithHandler null, handlerObject, reviewDataMessageError, null
            else
                @mqm.sendMessage 'review-unit-start-req', reviewDataMessage, (reviewDataSendMessageError, reviewDataSendMessageResult) =>
                    if reviewDataSendMessageError?
                        @continueWithHandler null, handlerObject, reviewDataSendMessageError, null
                    else
                        workerObject =
                            controllerRef: @
                            methodName: 'continueStartReview'
                            handler: handlerObject
                        @workerManager.enqueue reviewDataMessage.messageId, workerObject, (enqueueReviewDataError, enqueueReviewDataResult) =>
                            if enqueueReviewDataError?
                                @continueWithHandler null, handlerObject, enqueueReviewDataError, null
                            else
                                console.log "Enqueued the start review request. Waiting for the message from Microservice to proceed ..."

    continueStartReview: (startReviewError, startReviewResult, additionalArg, handlerObject) ->
        if startReviewError?
            @continueWithHandler null, handlerObject, startReviewError, null
        else
            @continueWithHandler null, handlerObject, null, startReviewResult


    recommend: (recommendationData, handlerObject) ->
        @messageGenerator.generate recommendationData, (recommendationDataMessageError, recommendationDataMessage) =>
            if recommendationDataMessageError?
                @continueWithHandler null, handlerObject, recommendationDataMessageError, null
            else
                @mqm.sendMessage 'review-unit-recommend-req', recommendationDataMessage, (recommendationDataSendMessageError, recommendationDataSendMessageResult) =>
                    if recommendationDataSendMessageError?
                        @continueWithHandler null, handlerObject, recommendationDataSendMessageError, null
                    else
                        workerObject =
                            controllerRef: @
                            methodName: 'continueRecommendReview'
                            handler: handlerObject
                        @workerManager.enqueue recommendationDataMessage.messageId, workerObject, (enqueueRecommendationDataError, enqueueRecommendationDataResult) =>
                            if enqueueRecommendationDataError?
                                @continueWithHandler null, handlerObject, enqueueReviewDataError, null
                            else
                                console.log "Enqueued the recommend review request. Waiting for the message from Microservice to proceed ..."

    continueRecommendReview: (recommendReviewError, recommendReviewResult, additionalArg, handlerObject) ->
        if recommendReviewError?
            @continueWithHandler null, handlerObject, recommendReviewError, null
        else
            @continueWithHandler null, handlerObject, null, recommendReviewResult
