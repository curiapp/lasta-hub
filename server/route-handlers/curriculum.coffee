'use strict'

# loading internal libraries
AbstractLocalRequestHandler = require('./abstract-local').AbstractLocalRequestHandler
CurriculaController         = require('../controllers/curricula').CurriculaController
CurriculumValidator         = require('../validators/curriculum').CurriculumValidator

exports.CurriculumRequestHandler = class CurriculumRequestHandler
    _currhInstance = undefined

    @getInstance: ->
        _currhInstance ?= new _LocalCurriculumRequestHandler

    class _LocalCurriculumRequestHandler extends AbstractLocalRequestHandler

        addDraft: (request, response) ->
            @validator.checkAndSanitizeForDraft request.body, (draftDataError, validDraftData) =>
                if draftDataError?
                    response.status(400).json({message: "Bad Request!"})
                else
                    @repoManager.addFinalDraft validDraftData.devCode, request.file, (repositoryError, commitHash) =>
                        if repositoryError?
                            response.status(500).json({message: "Error adding the programme draft file"})
                        else
                            handlerObject =
                                handlerRef: @
                                handlerObject: response
                            @controller.addDraft validDraftData, handlerObject

        constructor: ->
            super()
            @controller = new CurriculaController
            @validator = new CurriculumValidator
