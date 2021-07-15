'use strict'

# load internal libraries
SchemaValidator = require('./schema').SchemaValidator

exports.ReviewValidator = class ReviewValidator extends SchemaValidator

    checkAndSanitizeForStartup: (reviewData, callback) ->
        reviewOptions =
            devCode: (devCodePartialCallback) =>
                @helper.checkAndSanitizeCode reviewData.devCode, 'Programme Development Code', @validator, (devCodeError, validDevCode) =>
                    devCodePartialCallback devCodeError, validDevCode
            reviewDate: (datePartialCallback) =>
                @helper.checkAndSanitizeDate reviewData.date, 'Review Date', @validator, (dateError, validDate) =>
                    datePartialCallback dateError, validDate
        @flowController.parallel reviewOptions, (reviewDataError, validReviewData) =>
            callback reviewDataError, validReviewData

    checkAndSanitizeForRecommendation: (reviewData, callback) ->
        reviewOptions =
            devCode: (devCodePartialCallback) =>
                @helper.checkAndSanitizeCode reviewData.devCode, 'Programme Development Code', @validator, (devCodeError, validDevCode) =>
                    devCodePartialCallback devCodeError, validDevCode
            reviewUnit: (unitPartialCallback) =>
                @helper.checkAndSanitizePossibleValues reviewData.reviewUnit, ['TLU', 'CEU', 'QA', 'COLL'], 'Review Unit', @validator, (unitError, validUnit) =>
                    unitPartialCallback unitError, validUnit
            decision: (decisionPartialCallback) =>
                @helper.checkAndSanitizePossibleValues reviewData.decision, ['approve', 'decline'], 'Review Decision', @validator, (decisionError, validDecision) =>
                    decisionPartialCallback decisionError, validDecision
        @flowController.parallel reviewOptions, (reviewDataError, validReviewData) =>
            callback reviewDataError, validReviewData

    constructor: ->
        super()
