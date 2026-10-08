'use strict'

async = require 'async'

exports.SanitizationHelper = class SanitizationHelper
    _sanitizationHelperInstance = undefined

    @getInstance: ->
        _sanitizationHelperInstance ?= new _LocalSanitizationHelper

    class _LocalSanitizationHelper
        checkAndSanitizeName: (nameValue, token, validator, callback) ->
            hiphenIndex = nameValue.indexOf '-'
            if hiphenIndex > -1
                nameComponents = nameValue.split '-'
                nameComponentFuncs = nameComponents.map (nameComponentItem) =>
                    curFunc = (partialCallback) ->
                        @checkAndSanitizeWord nameComponentItem, token, validator, (nameComponentError, validNameComponent) =>
                            partialCallback nameComponentError, validNameComponent
                    return curFunc
                async.parallel nameComponentFuncs, (nameError1, validNameComponents) =>
                    if nameError1?
                        callback nameError1, null
                    else
                        callback null, validNameComponents.join('-')
            else
                @checkAndSanitizeWord nameValue, token, validator, (nameError, validName) =>
                    callback nameError, validName

        checkAndSanitizeAddressLine: (addressValue, token, validator, callback) ->
            if validator.matches(addressValue, /(\d+|\w+\s*)*/i)
                callback null, validator.trim(addressValue)
            else
                invalidAddressError = new Error "Error! #{token} is an invalid address line"
                callback invalidAddressError, null

        checkAndSanitizeProfile: (profileValue, token, possibleValues, validator, callback) ->
            if validator.isIn profileValue, possibleValues
                callback null, validator.trim(profileValue)
            else
                invalidProfileError = new Error "Error! the profile value in #{token} is invalid"
                callback invalidProfileError, null

        checkAndSanitizeAcademicStructure: (academicStructureValue, token, valueCollection, validator, callback) ->
            if validator.isIn academicStructureValue, valueCollection
                callback null, validator.trim(academicStructureValue)
            else
                invalidAcademicStructureError = new Error "Error! the code in #{token} is invalid"
                callback invalidAcademicStructureError, null

        checkAndSanitizeWord: (wordData, token, validator, callback) ->
            if validator.isAlpha(wordData)
                callback null, validator.trim(wordData)
            else
                invalidWordError = new Error "Error! #{token} is not a valid word"
                callback invalidWordError, null

        checkAndSanitizeWords: (wordsValue, token, validator, callback) ->
            wordComponents = wordsValue.split ' '
            wordComponentFuncs = wordComponents.map (wordComponentItem) =>
                curFunc = (partialCallback) ->
                    if not validator.matches(wordComponentItem, /\w+/i)
                        invalidWordComponentItemError = new Error "Error! #{token} contains an invalid word component"
                        partialCallback invalidWordComponentItemError, null
                    else
                        partialCallback null, validator.trim(wordComponentItem)
                return curFunc
            async.parallel wordComponentFuncs, (wordsError, validWordComponents) =>
                if wordsError?
                    callback wordsError, null
                else
                    callback null, validWordComponents.join ' '

        checkAndSanitizeCode: (codeValue, token, validator, callback) ->
            if validator.isAlphanumeric(codeValue)
                callback null, validator.trim(codeValue)
            else
                invalidCodeError = new Error "Error! value in #{token} is invalid"
                callback invalidCodeError, null

        checkAndSanitizeNumber: (numberValue, token, validator, callback) ->
            if validator.isNumeric(numberValue)
                callback null, validator.toInt(validator.trim(numberValue))
            else
                console.log "oops! it is not..."
                invalidNumberError = new Error "Error! the value in #{token} is an invalid number"
                callback invalidNumberError, null

        checkAndSanitizeBoolean: (boolVal, token, validator, callback) ->
            if validator.isBoolean(boolVal)
                revisedBooVal = null
                if validator.trim(boolVal) is true
                    revisedBooVal = true
                else
                    revisedBooVal = false
                callback null, revisedBooVal
            else
                invalidBoolError = new Error "Error! the value in #{token} is an invalid boolean"
                callback invalidBoolError, null

        checkAndSanitizeDate: (dateValue, token, validator, callback) ->
            if not validator.isDate(dateValue)
                invalidDateError = new Error "Error! the value in #{token} is an invalid date"
                callback invalidDateError, null
            else
                callback null, validator.trim(dateValue)

        checkAndSanitizePossibleValues: (memberValue, possibleValues, token, validator, callback) ->
            if not validator.isIn(memberValue, possibleValues)
                invalidPossibleValueError = new Error "Error! the value in #{token} is an invalid member value"
                callback invalidPossibleValueError, null
            else
                callback null, validator.trim(memberValue)

        checkAndSanitizeEmailAddress: (emailValue, token, validator, callback) ->
            if not validator.isEmail(emailValue)
                invalidEmailError = new Error "Error! the content of #{token} is not a valid email address"
                callback invalidEmailError, null
            else
                callback null, validator.normalizeEmail(validator.trim(emailValue))

        constructor: ->
