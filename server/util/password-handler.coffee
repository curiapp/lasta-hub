'use strict'

bcrypt = require 'bcrypt'

exports.PasswordHandler = class PasswordHandler
    constructor: ->

    hash: (clearPasswordText, callback) ->
        bcrypt.genSalt 12, (saltError, saltValue) =>
            if saltError?
                callback saltError, null
            else
                bcrypt.hash clearPasswordText, saltValue, (hashError, hashedPassword) =>
                    if hashError?
                        hashPasswordError = new Error "Error hashing the password"
                        callback hashPasswordError, null
                    else
                        callback null, hashedPassword

    verify: (clearPasswordText, hashedPassword, callback) ->
        console.log "will verify password for #{clearPasswordText} and #{hashedPassword} ..."
        bcrypt.compare clearPasswordText, hashedPassword, (compareError, compareResult) =>
          console.log "comparison completed..."
          console.log "error: #{compareError}"
          console.log "result: #{compareResult}"
          callback compareError, compareResult
