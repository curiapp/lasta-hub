'use strict'

# load internal libraries
SchemaValidator = require('./schema').SchemaValidator

exports.BodyValidator = class BodyValidator extends SchemaValidator

    checkAndSanitizeForAddDraft: (draftData, callback) ->
        draftOptions =
            devCode: (devCodePartialCallback) =>
                @helper.checkAndSanitizeCode draftData.devCode, 'Programme Development Code', @validator, (devCodeError, validDevCode) =>
                    devCodePartialCallback devCodeError, validDevCode
        @flowController.parallel draftOptions, (draftDataError, validDraftData) =>
            callback draftDataError, validDraftData

    checkAndSanitizeForBOSSubmission: (bosSubmissionData, callback) ->
        bosSubmissionOptions =
            devCode: (devCodePartialCallback) =>
                @helper.checkAndSanitizeCode bosSubmissionData.devCode, 'Programme Development Code', @validator, (devCodeError, validDevCode) =>
                    devCodePartialCallback devCodeError, validDevCode
            submissionDate: (datePartialCallback) =>
                @helper.checkAndSanitizeDate bosSubmissionData.date, 'BOS Submission Date', @validator, (dateError, validDate) =>
                    datePartialCallback dateError, validDate
        @flowController.parallel bosSubmissionOptions, (bosSubmissionDataError, validBOSSubmissionData) =>
            callback bosSubmissionDataError, validBOSSubmissionData

    checkAndSanitizeForFacultyRecommendation: (recommendationData, callback) ->
        console.log "printing the content of request body"
        console.dir recommendationData
        recommendationOptions =
            devCode: (devCodePartialCallback) =>
                @helper.checkAndSanitizeCode recommendationData.devCode, 'Programme Development Code', @validator, (devCodeError, validDevCode) =>
                    devCodePartialCallback devCodeError, validDevCode
            recommendationDate: (datePartialCallback) =>
                @helper.checkAndSanitizeDate recommendationData.date, 'Faculty Recommendation Date', @validator, (dateError, validDate) =>
                    datePartialCallback dateError, validDate
            status: (statusPartialCallback) =>
                @helper.checkAndSanitizePossibleValues recommendationData.status, ['recommend', 'resubmit', 'defer'], 'Faculty Recommendation Status', @validator, (statusError, validStatus) =>
                    statusPartialCallback statusError, validStatus
        @flowController.parallel recommendationOptions, (recommendationDataError, validRecommendationData) =>
            callback recommendationDataError, validRecommendationData

    checkAndSanitizeForStartSenate: (startSenateData, callback) ->
        startSenateOptions =
            devCode: (devCodePartialCallback) =>
                @helper.checkAndSanitizeCode startSenateData.devCode, 'Programme Development Code', @validator, (devCodeError, validDevCode) =>
                    devCodePartialCallback devCodeError, validDevCode
            startSenateDate: (datePartialCallback) =>
                @helper.checkAndSanitizeDate startSenateData.date, 'Start Senate Date', @validator, (dateError, validDate) =>
                    datePartialCallback dateError, validDate
        @flowController.parallel startSenateOptions, (startSenateDataError, validStartSenateData) =>
            callback startSenateDataError, validStartSenateData

    checkAndSanitizeForAPCRecommendation: (recommendationData, callback) ->
        recommendationOptions =
            devCode: (devCodePartialCallback) =>
                @helper.checkAndSanitizeCode recommendationData.devCode, 'Programme Development Code', @validator, (devCodeError, validDevCode) =>
                    devCodePartialCallback devCodeError, validDevCode
            decision: (decisionPartialCallback) =>
                @helper.checkAndSanitizePossibleValues recommendationData.decision, ['approve', 'decline'], 'APC Recommendation Status', @validator, (decisionError, validDecision) =>
                    decisionPartialCallback decisionError, validDecision
        @flowController.parallel recommendationOptions, (recommendationDataError, validRecommendationData) =>
            callback recommendationDataError, validRecommendationData

    checkAndSanitizeForOtherFacultyRecommendation: (recommendationData, callback) ->
        recommendationOptions =
            devCode: (devCodePartialCallback) =>
                @helper.checkAndSanitizeCode recommendationData.devCode, 'Programme Development Code', @validator, (devCodeError, validDevCode) =>
                    devCodePartialCallback devCodeError, validDevCode
            recommendationDate: (datePartialCallback) =>
                @helper.checkAndSanitizeDate recommendationData.date, 'Faculty Recommendation Date', @validator, (dateError, validDate) =>
                    datePartialCallback dateError, validDate
        @flowController.parallel recommendationOptions, (recommendationDataError, validRecommendationData) =>
            callback recommendationDataError, validRecommendationData

    checkAndSanitizeForFinalSenateRecommendation: (recommendationData, callback) ->
        recommendationOptions =
            devCode: (devCodePartialCallback) =>
                @helper.checkAndSanitizeCode recommendationData.devCode, 'Programme Development Code', @validator, (devCodeError, validDevCode) =>
                    devCodePartialCallback devCodeError, validDevCode
            finalSubmissionDate: (datePartialCallback) =>
                @helper.checkAndSanitizeDate recommendationData.date, 'Faculty Recommendation Date', @validator, (dateError, validDate) =>
                    datePartialCallback dateError, validDate
            madeBy: (madeByPartialCallback) =>
                @helper.checkAndSanitizePossibleValues recommendationData.madeBy, ['senate', 'senex'], 'Decision Body', @validator, (madeByError, validMadeBy) =>
                    madeByPartialCallback madeByError, validMadeBy
            status: (statusPartialCallback) =>
                testSet = undefined
                if recommendationData.madeBy is 'senate'
                    testSet = ['approve', 'decline', 'defer']
                else
                    testSet = ['approve', 'decline']
                @helper.checkAndSanitizePossibleValues recommendationData.status, testSet, 'Faculty Recommendation Status', @validator, (statusError, validStatus) =>
                    statusPartialCallback statusError, validStatus
        @flowController.parallel recommendationOptions, (recommendationDataError, validRecommendationData) =>
            callback recommendationDataError, validRecommendationData

    constructor: ->
        super()
