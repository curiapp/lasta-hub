'use strict'

# loading internal libraries
AbstractLocalRequestHandler = require('./abstract-local').AbstractLocalRequestHandler
ConsultationsController     = require('../controllers/consultations').ConsultationsController
ConsultationValidator       = require('../validators/consultation').ConsultationValidator

exports.ConsultationRequestHandler = class ConsultationRequestHandler
    _consrhInstance = undefined

    @getInstance: ->
        _consrhInstance ?= new _LocalConsultationRequestHandler

    class _LocalConsultationRequestHandler extends AbstractLocalRequestHandler

        startPACConsultations: (request, response) ->
            @validator.checkAndSanitizeForConsultations request.body, (consultationDataError, validConsultationData) =>
                if consultationDataError?
                    response.status(400).json({message: "Bad Request!"})
                else
                    @repoManager.addConsultation validConsultationData.devCode, request.file, (repositoryError, commitHash) =>
                        if repositoryError?
                            response.status(500).json({message: "Error adding consultation details to the repository"})
                        else
                            handlerObject =
                                handlerRef: @
                                responseObject: response
                            @controller.startPACConsultations validConsultationData, handlerObject

        addBenchmark: (request, response) ->
            @validator.checkAndSanitizeForBenchmark request.body, (benchmarkDataError, validBenchmarkData) =>
                if benchmarkDataError?
                    response.status(400).json({message: "Bad Request!"})
                else
                    @repoManager.addBenchmark validBenchmarkData.devCode, request.file, (repositoryError, commitHash) =>
                        if repositoryError?
                            response.status(500).json({message: "Error adding benchmark file to the repository"})
                        else
                            handlerObject =
                                handlerRef: @
                                responseObject: response
                            @controller.addBenchmark validBenchmarkData, handlerObject

        addFinalDraft: (request, response) ->
            @validator.checkAndSanitizeForFinalDraft request.body, (finalDraftDataError, validFinalDraftData) =>
                if finalDraftDataError?
                    response.status(400).json({message: "Bad Request for final draft submission!"})
                else
                    @repoManager.addFinalDraft validFinalDraftData.devCode, request.file, (repositoryError, commitHash) =>
                        if repositoryError?
                            response.status(500).json({message: "Error storing final draft in repository!"})
                        else
                            handlerObject =
                                handlerRef: @
                                responseObject: response
                            @controller.addFinalDraft validFinalDraftData, handlerObject

        endorse: (request, response) ->
            @validator.checkAndSanitizeForEndorsement request.body, (endorsementDataError, validEndorsementData) =>
                if endorsementDataError?
                    response.status(400).json({message: "Bad Request for draft endorsement!"})
                else
                    @repoManager.addEndorsement validEndorsementData.devCode, request.file, validEndorsementData.decision, (repositoryError, commitHash) =>
                        if repositoryError?
                            response.status(500).json({message: "Error storing draft endorsement in repository!"})
                        else
                            handlerObject =
                                handlerRef: @
                                responseObject: response
                            @controller.endorse validEndorsementData, handlerObject

        recordConsultations: (request, response) ->
            @validator.checkAndSanitizeForConsultationRecord request.body, (consultationDataError, validConsultationData) =>
                if consultationDataError?
                    response.status(400).json({message: "Bad Request for consultation record!"})
                else
                    repoFiles = [
                        {name: request.files['endorsements'][0], ind: 0},
                        {name: request.files['benchmarking'][0], ind: 1}
                    ]
                    @repoManager.addConsultationRecord validConsultationData.devCode, repoFiles, (repositoryError, commitHash) =>
                        if repositoryError?
                            response.status(500).json({message: "Error storing consultation records in repository"})
                        else
                            handlerObject =
                                handlerRef: @
                                responseObject: response
                            @controller.recordConsultations validConsultationData, handlerObject


        constructor: ->
            super()
            @controller = new ConsultationsController
            @validator = new ConsultationValidator
