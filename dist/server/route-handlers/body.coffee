'use strict'

# loading internal libraries
AbstractLocalRequestHandler = require('./abstract-local').AbstractLocalRequestHandler
BodiesController            = require('../controllers/bodies').BodiesController
BodyValidator               = require('../validators/body').BodyValidator

exports.BodyRequestHandler = class BodyRequestHandler
    _bdrhInstance = undefined

    @getInstance: ->
        _bdrhInstance ?= new _LocalBodyRequestHandler

    class _LocalBodyRequestHandler extends AbstractLocalRequestHandler

        addDraft: (request, response) ->
            @validator.checkAndSanitizeForAddDraft request.body, (draftDataError, validDraftData) =>
                if draftDataError?
                    response.status(400).json({message: "Bad Request adding a BOS draft!"})
                else
                    @repoManager.addBOSDraft validDraftData.devCode, request.file, (repositoryError, commitHash) =>
                        if repositoryError?
                            response.status(500).json({message: "Error adding the BOS draft document to the repository"})
                        else
                            handlerObject =
                                handlerRef: @
                                responseObject: response
                            @controller.addDraft validDraftData, handlerObject

        submitToBOS: (request, response) ->
            @validator.checkAndSanitizeForBOSSubmission request.body, (bosSubmissionDataError, validBOSSubmissionData) =>
                if bosSubmissionDataError?
                    response.status(400).json({message: "Bad Request submitting to BOS!"})
                else
                    handlerObject =
                        handlerRef: @
                        responseObject: response
                    @controller.submitToBOS validBOSSubmissionData, handlerObject

        addFacultyRecommendation: (request, response) ->
            @validator.checkAndSanitizeForFacultyRecommendation request.body, (recDataError, validRecData) =>
                if recDataError?
                    response.status(400).json({message: "Bad Request adding Faculty recommendation!"})
                else
                    @repoManager.addFacultyRecommendation validRecData.devCode, request.file, validRecData.status, (repositoryError, commitHash) =>
                        if repositoryError?
                            response.status(500).json({message: "Error adding the Faculty recommendation document to the repository"})
                        else
                            handlerObject =
                                handlerRef: @
                                responseObject: response
                            @controller.addFacultyRecommendation validRecData, handlerObject

        startSenate: (request, response) ->
            @validator.checkAndSanitizeForStartSenate request.body, (startSenateDataError, validStartSenateData) =>
                if startSenateDataError?
                    response.status(400).json({message: "Bad Request starting Senate!"})
                else
                    handlerObject =
                        handlerRef: @
                        responseObject: response
                    @controller.startSenate validStartSenateData, handlerObject

        addAPCRecommendation: (request, response) ->
            @validator.checkAndSanitizeForAPCRecommendation request.body, (recDataError, validRecData) =>
                if recDataError?
                    response.status(400).json({message: "Bad Request adding APC recommendation!"})
                else
                    @repoManager.addAPCRecommendation validRecData.devCode, request.file, validRecData.decision, (repositoryError, commitHash) =>
                        if repositoryError?
                            response.status(500).json({message: "Error adding the APC recommendation document to the repository"})
                        else
                            handlerObject =
                                handlerRef: @
                                responseObject: response
                            @controller.addAPCRecommendation validRecData, handlerObject

        addOtherFacultyRecommendation: (request, response) ->
            @validator.checkAndSanitizeForOtherFacultyRecommendation request.body, (recDataError, validRecData) =>
                if recDataError?
                    response.status(400).json({message: "Bad Request adding other Faculty recommendation!"})
                else
                    rander = Math.floor((Math.random() * 9)) + 1
                    @repoManager.addOtherFacultyRecommendation validRecData.devCode, request.file, "#{rander}", (repositoryError, commitHash) =>
                        if repositoryError?
                            response.status(500).json({message: "Error adding the Faculty recommendation document to the repository"})
                        else
                            handlerObject =
                                handlerRef: @
                                responseObject: response
                            @controller.addOtherFacultyRecommendation validRecData, handlerObject

        recordSenateFinalRecommendation: (request, response) ->
            @validator.checkAndSanitizeForFinalSenateRecommendation request.body, (recDataError, validRecData) =>
                if recDataError?
                    response.status(400).json({message: "Bad Request adding Final Senate recommendation!"})
                else
                    decSuffix = "#{validRecData.madeBy}-#{validRecData.status}"
                    @repoManager.addSenateFinalRecommendation validRecData.devCode, request.file, decSuffix, (repositoryError, commitHash) =>
                        if repositoryError?
                            response.status(500).json({message: "Error adding the APC recommendation document to the repository"})
                        else
                            handlerObject =
                                handlerRef: @
                                responseObject: response
                            @controller.recordSenateFinalRecommendation validRecData, handlerObject

        constructor: ->
            super()
            @controller = new BodiesController
            @validator = new BodyValidator
