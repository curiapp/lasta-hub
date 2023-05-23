'use strict'

# load internal libraries
SchemaValidator = require('./schema').SchemaValidator

exports.QualificationValidator = class QualificationValidator extends SchemaValidator

    checkAndSanitizeForPreparation: (preparationData, callback) ->
        preparationOptions =
            devCode: (devCodePartialCallback) =>
                @helper.checkAndSanitizeCode preparationData.devCode, 'Programme Development Code', @validator, (devCodeError, validDevCode) =>
                    devCodePartialCallback devCodeError, validDevCode
        @flowController.parallel preparationOptions, (preparationDataError, validPreparationData) =>
            callback preparationDataError, validPreparationData

    checkAndSanitizeForPDURecommendation: (recommendationData, callback) ->
        recommendationOptions =
            devCode: (devCodePartialCallback) =>
                @helper.checkAndSanitizeCode recommendationData.devCode, 'Programme Development Code', @validator, (devCodeError, validDevCode) =>
                    devCodePartialCallback devCodeError, validDevCode
            decision: (decisionPartialCallback) =>
                @helper.checkAndSanitizePossibleValues recommendationData.decision, ['approve', 'defer'], 'Recommendation Decision', @validator, (decisionError, validDecision) =>
                    decisionPartialCallback decisionError, validDecision
            submissionType: (subPartialCallback) =>
                @helper.checkAndSanitizeBoolean recommendationData.submissionType, 'Initial submission or not', @validator, (isInitError, validIsInit) =>
                    subPartialCallback isInitError, validIsInit
        @flowController.parallel recommendationOptions, (recommendationDataError, validRecommendationData) =>
            callback recommendationDataError, validRecommendationData

    checkAndSanitizeForRecommendation: (recommendationData, callback) ->
        recommendationOptions =
            devCode: (devCodePartialCallback) =>
                @helper.checkAndSanitizeCode recommendationData.devCode, 'Programme Development Code', @validator, (devCodeError, validDevCode) =>
                    devCodePartialCallback devCodeError, validDevCode
            decision: (decisionPartialCallback) =>
                @helper.checkAndSanitizePossibleValues recommendationData.decision, ['approve', 'decline'], 'Recommendation Decision', @validator, (decisionError, validDecision) =>
                    decisionPartialCallback decisionError, validDecision
        @flowController.parallel recommendationOptions, (recommendationDataError, validRecommendationData) =>
            callback recommendationDataError, validRecommendationData

    checkAndSanitizeForRegistration: (registrationData, callback) ->
        registrationOptions =
            devCode: (devCodePartialCallback) =>
                @helper.checkAndSanitizeCode registrationData.devCode, 'Programme Development Code', @validator, (devCodeError, validDevCode) =>
                    devCodePartialCallback devCodeError, validDevCode
            registrationDate: (datePartialCallback) =>
                @helper.checkAndSanitizeDate registrationData.date, 'Registration Date', @validator, (dateError, validDate) =>
                    datePartialCallback dateError, validDate
            qtitle: (titlePartialCallback) =>
                @helper.checkAndSanitizeWords registrationData.qtitle, 'Programme Title', @validator, (titleError, validTitle) =>
                    namePartialCallback titleError, validTitle
            nqfId: (codePartialCallback) =>
                @helper.checkAndSanitizeCode registrationData.nqfId, 'Qualification Identifier', @validator, (progCodeError, validID) =>
                    codePartialCallback progCodeError, validID
        @flowController.parallel registrationOptions, (registrationDataError, validRegistrationData) =>
            callback registrationDataError, validRegistrationData

    checkAndSanitizeForSubmission: (submissionData, callback) ->
        submissionOptions =
            devCode: (devCodePartialCallback) =>
                @helper.checkAndSanitizeCode submissionData.devCode, 'Programme Development Code', @validator, (devCodeError, validDevCode) =>
                    devCodePartialCallback devCodeError, validDevCode
            isInit: (initPartialCallback) =>
                @helper.checkAndSanitizeBoolean submissionData.type, 'Initial submission or not', @validator, (isInitError, validIsInit) =>
                    initPartialCallback isInitError, validIsInit
        @flowController.parallel submissionOptions, (submissionDataError, validSubmissionData) =>
            callback submissionDataError, validSubmissionData

    constructor: ->
        super()
