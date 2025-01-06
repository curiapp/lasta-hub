'use strict'

# load internal libraries
SchemaValidator = require('./schema').SchemaValidator

exports.UserValidator = class UserValidator extends SchemaValidator

    checkAndSanitizeForCreation: (userData, callback) ->
        userOptions =
            username: (usernamePartialCallback) =>
                @checkAndSanitizeUsername userData.username, (usernameError, validUsername) =>
                    usernamePartialCallback usernameError, validUsername
            firstName: (firstNamePartialCallback) =>
                @checkAndSanitizeName userData.firstName, "User First Name", (firstNameError, validFirstName) =>
                    firstNamePartialCallback firstNameError, validFirstName
            lastName: (lastNamePartialCallback) =>
                @checkAndSanitizeName userData.lastName, "User Last Name", (lastNameError, validLastName) =>
                    lastNamePartialCallback lastNameError, validLastName
            profile: (profilePartialCallback) =>
                @checkAndSanitizeProfile userData.profile, (profileError, validProfile) =>
                    profilePartialCallback profileError, validProfile
            institution: (institutionPartialCallback) =>
                @checkAndSanitizeInstitution userData.institution, (institutionError, validInstitution) =>
                    institutionPartialCallback institutionError, validInstitution
        @flowController.parallel userOptions, (userValidationError, validUser) =>
            if userValidationError?
                callback userValidationError, null
            else
                validUser['password'] = userData.password
                callback null, validUser

    checkAndSanitizeForAuthentication: (username, callback) ->
        @checkAndSanitizeUsername username, (usernameError, validUsername) =>
            callback usernameError, validUsername

    checkAndSanitizeUsername: (username, callback) ->
        @helper.checkAndSanitizeWord username, 'Username', @validator, (usernameError, validUsername) =>
            callback usernameError, validUsername

    checkAndSanitizeName: (name, token, callback) ->
        @helper.checkAndSanitizeName name, token, @validator, (nameError, validName) =>
            callback nameError, validName

    checkAndSanitizeProfile: (profileValue, callback) ->
        @helper.checkAndSanitizeProfile profileValue, 'User Profile', ['hod', 'cdc', 'pac'], @validator, (profileError, validProfile) =>
            callback profileError, validProfile

    checkAndSanitizeInstitution: (institution, callback) ->
        institutionOptions =
            name: (instNamePartialCallback) =>
                @checkAndSanitizeInstitutionName institution.name, (instNameError, validInstName) =>
                    instNamePartialCallback instNameError, validInstName
            address: (instAddressPartialCallback) =>
                @checkAndSanitizeInstitutionAddress institution.address, (instAddressError, validInstAddress) =>
                    instAddressPartialCallback instAddressError, validInstAddress
        @flowController.parallel institutionOptions, (institutionError, validInstitution) =>
            callback instAddressError, validInstitution

    checkAndSanitizeInstitutionName: (institutionName, callback) ->
        @helper.checkAndSanitizewords institutionName, 'Institution Name', @validator, (institutionNameError, validInstitutionName) =>
            callback institutionNameError, validInstitutionName

    checkAndSanitizeInstitutionAddress: (institutionAddress, callback) ->
        @helper.checkAndSanitizeAddressLine institutionAddress, 'Institution Address', @validator, (institutionAddressError, validInstitutionAddress) =>
            callback institutionAddressError, validInstitutionAddress

    constructor: ->
        super()
