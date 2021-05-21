'use strict'

# loading internal libraries
AbstractLocalRequestHandler = require('./abstract-local').AbstractLocalRequestHandler
NeedAnalysesController      = require('../controllers/need-analyses').NeedAnalysesController
NeedAnalysisValidator       = require('../validators/need-analysis').NeedAnalysisValidator

exports.NeedAnalysisRequestHandler = class NeedAnalysisRequestHandler
    _narhInstance = undefined

    @getInstance: ->
        _narhInstance ?= new _LocalNeedAnalysisRequestHandler

    class _LocalNeedAnalysisRequestHandler extends AbstractLocalRequestHandler

        startNeedAnalysis: (request, response) ->
            console.log "inside startNeedAnalysis"
            console.dir request.body
            @validator.checkAndSanitizeForInitialization request.body, (startNeedAnalysisDataError, validStartNeedAnalysisData) =>
                if startNeedAnalysisDataError?
                    response.status(400).json({message: "Bad Request!"})
                else
                    handlerObject =
                        handlerRef: @
                        responseObject: response
                    @controller.startNeedAnalysis validStartNeedAnalysisData, handlerObject

        submitConsultationDetails: (request, response) ->
            @validator.checkAndSanitizeForConsultation request.body, (consultInNeedAnalysisError, validNeedAnalysisConsultation) =>
                if consultInNeedAnalysisError?
                    response.status(400).json({message: "Bad Request!"})
                else
                    console.dir request.file
                    console.dir request.body
                    @repoManager.addNeedAnalysisConsultation validNeedAnalysisConsultation.devCode, request.file, (repositoryError, commitHash) =>
                        if repositoryError?
                            response.status(500).json({message: "Error adding the consulation file to the repository"})
                        else
                            validNeedAnalysisConsultation['commitHash'] = commitHash
                            handlerObject =
                                handlerRef: @
                                responseObject: response
                            @controller.submitConsultationDetails validNeedAnalysisConsultation, handlerObject

        conclude: (request, response) ->
            console.log "before testing the content of the conclude"
            console.dir request.body
            console.dir request.file
            @validator.checkAndSanitizeForConclusion request.body, (conclusionDataError, validConclusionData) =>
                if conclusionDataError?
                    response.status(400).json({message: "Bad Request!"})
                else
                    console.log "testing the content of the conclude"
                    console.dir request.body
                    console.dir request.file
                    @repoManager.addNeedAnalysisChecklist validConclusionData.devCode, request.file, validConclusionData.decission, (repositoryError, commitHash) =>
                        if repositoryError?
                            response.status(500).json({message: "Error add the survey to the repository"})
                        else
                            validConclusionData["commitHash"] = commitHash
                            handlerObject =
                                handlerRef: @
                                responseObject: response
                            @controller.conclude validConclusionData, handlerObject

        submitSurvey: (request, response) ->
            @validator.checkAndSanitizeForSurvey request.body, (surveyDataError, validDevCode) =>
                if surveyDataError?
                    response.status(400).json({message: "Bad Request"})
                else
                    console.log "will explore the content of the file"
                    console.dir request.body
                    console.dir request.file
                    @repoManager.addNeedAnalysisSurvey validDevCode, request.file, (repositoryError, commitHash) =>
                        if repositoryError?
                            response.status(500).json({message: "Error adding the survey file to the repository"})
                        else
                            validSurveyData =
                                devCode: validDevCode
                                commitHash: commitHash
                            handlerObject =
                                handlerRef: @
                                responseObject: response
                            @controller.submitSurvey validSurveyData, handlerObject

        startBOSPhase: (request, response) ->
            console.log "inside start bos phase"
            @validator.checkAndSanitizeForBOSStartup request.body, (bosSubmissionDataError, validBosSubmissionData) =>
                if bosSubmissionDataError?
                    console.log "validation error..."
                    response.status(400).json({message: "Bad Request!"})
                else
                    console.log "content of the object..."
                    console.dir validBosSubmissionData
                    handlerObject =
                        handlerRef: @
                        responseObject: response
                    @controller.startBOSPhase validBosSubmissionData, handlerObject

        recordBOSRecommendations: (request, response) ->
            console.log "the content of the object is"
            console.dir request.body
            @validator.checkAndSanitizeForBOSAmendments request.body, (amendmentDataError, validAmendmentData) =>
                if amendmentDataError?
                    response.status(400).json({message: "Bad Request"})
                else
                    console.log "testing content of request ..."
                    console.dir request.body
                    console.dir request.file
                    @repoManager.addBosAmendment validAmendmentData.devCode, request.file, validAmendmentData.status, (repositoryError, commitHash) =>
                        if repositoryError?
                            response.status(500).json({message: "Error adding the BOS amendment file to the repository"})
                        else
                            validAmendmentData["commitHash"] = commitHash
                            handlerObject =
                                handlerRef: @
                                responseObject: response
                            @controller.handleBOSRecommendations validAmendmentData, handlerObject

        recordSenateRecommendations: (request, response) ->
            console.log "the content of the object is"
            console.dir request.body
            @validator.checkAndSanitizeForSenateAmendments request.body, (amendmentDataError, validAmendmentData) =>
                if amendmentDataError?
                    response.status(400).json({message: "Bad Request"})
                else
                    console.log "testing content of request ..."
                    console.dir request.body
                    console.dir request.file
                    @repoManager.addSenateAmendment validAmendmentData.devCode, request.file, validAmendmentData.status, (repositoryError, commitHash) =>
                        if repositoryError?
                            response.status(500).json({message: "Error addind the Senate amendment file to the repository"})
                        else
                            validAmendmentData["commitHash"] = commitHash
                            handlerObject =
                                handlerRef: @
                                responseObject: response
                            @controller.handleSenateRecommendations validAmendmentData, handlerObject

        startSenatePhase: (request, response) ->
            @validator.checkAndSanitizeForSenateStartup request.body, (senateSubmissionError, validSenateSubmissionData) =>
                if senateSubmissionError?
                    response.status(400).json({message: "Bad Request!"})
                else
                    handlerObject =
                        handlerRef: @
                        responseObject: response
                    @controller.startSenatePhase validSenateSubmissionData, handlerObject

        constructor: ->
            super()
            @controller = new NeedAnalysesController
            @validator = new NeedAnalysisValidator
