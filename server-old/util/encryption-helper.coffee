'use strict'

CryptoJS = require 'crypto-js'

exports.EncryptionHelper = class EncryptionHelper
    _encryptionHelperInstance = undefined

    @getInstance: ->
        _encryptionHelperInstance ?= new _LocalEncryptionHelper

    class _LocalEncryptionHelper
        constructor: ->
            @crypto = CryptoJS
            @cryptoSecret = 'Secret Key 123'

        encryptText: (clearText, callback) ->
            cipherText = @crypto.AES.encrypt clearText, @cryptoSecret
            console.log "encrypted text #{cipherText}"
            callback null, cipherText

        decryptText: (cipherText, callback) ->
            textBytes = @crypto.AES.decrypt cipherText.toString(), @cryptoSecret
            plainText = textBytes.toString @crypto.enc.Utf8
            console.log "decrypted text #{plainText}"
            callback null, plainText
