'use strict'

pkgConfig = require('package-config').load(__dirname + '/../package.json')

exports.ConfigurationManager = class ConfigurationManager
    _cfManagerInstance = undefined

    @getInstance: ->
        _cfManagerInstance ?= new _LocalConfigurationManager

    class _LocalConfigurationManager
        constructor: ->
            @configM = pkgConfig
            console.log "inside Configuration Manager constructor..."
            console.dir @configM

        getServerPort: ->
            console.log "inside getServerPort in config manager..."
            console.dir @configM
            return @configM.serverPort

        getTokenSecret: ->
            console.log "inside getTokenSecret in config manager..."
            console.dir @configM
            return @configM.tokenSecret
