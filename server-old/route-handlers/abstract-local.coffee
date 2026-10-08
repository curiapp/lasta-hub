'use strict'

moment = require('moment')
jwt    = require('jwt-simple')

ConfigurationManager = require('../util/config-manager').ConfigurationManager
RepositoryManager    = require('../util/repository-manager').RepositoryManager

exports.AbstractLocalRequestHandler = class AbstractLocalRequestHandler

    completeRequestHandling: (response, resultError, result) ->
        if resultError?
            response.status(500).json({message: "Internal Error! #{resultError.message}"})
        else
            response.status(201).json(result)

    completeRequestHandlingWithToken: (tokenIssuerAttr, response, resultError, result) ->
        tokenExpires = moment().add(8, 'days').valueOf()
        tokenSecret = ConfigurationManager.getInstance().getTokenSecret()
        tokenIssuerValue = result[tokenIssuerAttr]
        tokenEncodingOptions =
            iss: tokenIssuerValue
            exp: tokenExpires

        if result.hasOwnProperty 'profile'
            tokenEncodingOptions["profile"] = result.profile

        token = jwt.encode tokenEncodingOptions, tokenSecret
        newResult = {}
        newResult[resultKey] = resultValue for resultKey, resultValue of result
        newResult.token = token
        newResult.expires = tokenExpires
        @completeRequestHandling response, resultError, newResult

    constructor: ->
        @repoManager = RepositoryManager.getInstance()
