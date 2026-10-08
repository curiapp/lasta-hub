'use strict'

# loading external libraries
async = require 'async'
validator = require 'validator'

# loading internal libraries
SanitizationHelper = require('../util/sanitization-helper').SanitizationHelper

exports.SchemaValidator = class SchemaValidator

    constructor: ->
        @helper = SanitizationHelper.getInstance()
        @flowController = async
        @validator = validator
