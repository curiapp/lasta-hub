'use strict'

# load internal libraries
SchemaValidator = require('./schema').SchemaValidator

exports.CurriculumValidator = class CurriculumValidator extends SchemaValidator


    checkAndSanitizeForDraft: (draftData, callback) ->
        draftOptions =
            devCode: (devCodePartialCallback) =>
                @helper.checkAndSanitizeCode draftData.devCode, 'Programme Development Code', @validator, (devCodeError, validDevCode) =>
                    devCodePartialCallback devCodeError, validDevCode
            date: (datePartialCallback) =>
                @helper.checkAndSanitizeDate draftData.date, 'Draft Date', @validator, (draftDateError, validDraftDate) =>
                    datePartialCallback draftDateError, validDraftDate
        @flowController.parallel draftOptions, (draftDataError, validDraftData) =>
            callback draftDataError, validDraftData

    constructor: ->
        super()
