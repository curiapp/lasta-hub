'use strict'

# load internal libraries
SchemaValidator = require('./schema').SchemaValidator

exports.ConsultationValidator = class ConsultationValidator extends SchemaValidator

    checkAndSanitizeForConsultationRecord: (consultationData, callback) ->
        @checkAndSanitizeForConsultations consultationData, (consultationDataError, validConsultationData) =>
            callback consultationDataError, validConsultationData

    checkAndSanitizeForConsultations: (consultationData, callback) ->
        consultationDataOptions =
            devCode: (devCodePartialCallback) =>
                @helper.checkAndSanitizeCode consultationData.devCode, 'Programme Development Code', @validator, (devCodeError, validDevCode) =>
                    devCodePartialCallback devCodeError, validDevCode
            consDate: (datePartialCallback) =>
                @helper.checkAndSanitizeDate consultationData.date, 'Consultation Date', @validator, (dateError, validDate) =>
                    datePartialCallback dateError, validDate
        @flowController.parallel consultationDataOptions, (consultationDataError, validConsultationData) =>
            callback consultationDataError, validConsultationData

    checkAndSanitizeForBenchmark: (benchmarkData, callback) ->
        benchmarkOptions =
            devCode: (devCodePartialCallback) =>
                @helper.checkAndSanitizeCode benchmarkData.devCode, 'Programme Development Code', @validator, (devCodeError, validDevCode) =>
                    devCodePartialCallback devCodeError, validDevCode
        @flowController.parallel benchmarkOptions, (benchmarkDataError, validBenchmarkData) =>
            callback benchmarkDataError, validBenchmarkData

    checkAndSanitizeForFinalDraft: (finalDraftData, callback) ->
        finalDraftOptions =
            devCode: (devCodePartialCallback) =>
                @helper.checkAndSanitizeCode finalDraftData.devCode, 'Programme Development Code', @validator, (devCodeError, validDevCode) =>
                    devCodePartialCallback devCodeError, validDevCode
        @flowController.parallel finalDraftOptions, (finalDraftDataError, validFinalDraftData) =>
            callback finalDraftDataError, validFinalDraftData

    checkAndSanitizeForEndorsement: (endorsementData, callback) ->
        endorsementOptions =
            devCode: (devCodePartialCallback) =>
                @helper.checkAndSanitizeCode endorsementData.devCode, 'Programme Development Code', @validator, (devCodeError, validDevCode) =>
                    devCodePartialCallback devCodeError, validDevCode
            endorsementDate: (datePartialCallback) =>
                @helper.checkAndSanitizeDate endorsementData.date, 'Endorsement Date', @validator, (dateError, validDate) =>
                    datePartialCallback dateError, validDate
            decision: (decisionPartialCallback) =>
                @helper.checkAndSanitizePossibleValues endorsementData.decision, ['approve', 'decline'], 'Endorsement Decision', @validator, (decisionError, validDecision) =>
                    decisionPartialCallback decisionError, validDecision
        @flowController.parallel endorsementOptions, (endorsementDataError, validEndorsementData) =>
            callback endorsementDataError, validEndorsementData

    constructor: ->
        super()
