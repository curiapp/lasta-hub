'use strict'

# loading internal libraries
AbstractLocalRequestHandler = require('./abstract-local').AbstractLocalRequestHandler
QualificationsController    = require('../controllers/qualifications').QualificationsController
QualificationValidator      = require('../validators/qualification').QualificationValidator

exports.QualificationRequestHandler = class QualificationRequestHandler
    _qualrhInstance = undefined

    @getInstance: ->
        _qualrhInstance ?= new _LocalQualificationRequestHandler

    class _LocalQualificationRequestHandler extends AbstractLocalRequestHandler

        prepare: (request, response) ->
            @validator.checkAndSanitizeForPreparation request.body, (preparationDataError, validPreparationData) =>
                if preparationDataError?
                    response.status(400).json({message: "Bad Request preparing for NQA submission!"})
                else
                    console.log "printing file names ..."
                    # console.log "total count of files #{request.files.length}"
                    # console.dir request.files[0]
                    # console.dir request.files[1]
                    # repoFiles = [request.files[0], request.files[1]]
                    # repoFiles = [request.files['qualification-doc'][0], request.files['support-file'][0]]
                    repoFiles = [
                        {name: request.files['qualification-doc'][0], ind: 0},
                        {name: request.files['support-file'][0], ind: 1}
                    ]
                    @repoManager.addNQAPreparation validPreparationData.devCode, repoFiles, (repositoryError, commitHash) =>
                        if repositoryError?
                            response.status(500).json({message: "Error adding the NQA preparation documents to the repository"})
                        else
                            handlerObject =
                                handlerRef: @
                                responseObject: response
                            @controller.prepare validPreparationData, handlerObject

        addPDURecommendation: (request, response) ->
            @validator.checkAndSanitizeForPDURecommendation request.body, (recommendationDataError, validRecommendationData) =>
                if recommendationDataError?
                    response.status(400).json({message: "Bad Request adding PDU recommendation submission!"})
                else
                    @repoManager.addPDURecommendation validRecommendationData.devCode, request.file, validRecommendationData.decision, (repositoryError, commitHash) =>
                        if repositoryError?
                            response.status(500).json({message: "Error adding the PDU recommendation documents to the repository"})
                        else
                            handlerObject =
                                handlerRef: @
                                responseObject: response
                            @controller.addPDURecommendation validRecommendationData, handlerObject

        addRecommendation: (request, response) ->
            @validator.checkAndSanitizeForRecommendation request.body, (recommendationDataError, validRecommendationData) =>
                if recommendationDataError?
                    response.status(400).json({message: "Bad Request adding NQA recommendation submission!"})
                else
                    @repoManager.addNQARecommendation validRecommendationData.devCode, request.file, validRecommendationData.decision, (repositoryError, commitHash) =>
                        if repositoryError?
                            response.status(500).json({message: "Error adding the NQA recommendation documents to the repository"})
                        else
                            handlerObject =
                                handlerRef: @
                                responseObject: response
                            @controller.addRecommendation validRecommendationData, handlerObject

        register: (request, response) ->
            @validator.checkAndSanitizeForRegistration request.body, (recgistrationDataError, validRegistrationData) =>
                if recommendationDataError?
                    response.status(400).json({message: "Bad Request adding programme registration!"})
                else
                    @repoManager.addProgrammeDocument validRegistrationData.devCode, request.file, (repositoryError, commitHash) =>
                        if repositoryError?
                            response.status(500).json({message: "Error adding the programme document to the repository"})
                        else
                            handlerObject =
                                handlerRef: @
                                responseObject: response
                            @controller.register validRegistrationData, handlerObject

        submit: (request, response) ->
            # this method needs a revision
            @validator.checkAndSanitizeForSubmission request.body, (submissionDataError, validSubmissionData) =>
                if preparationDataError?
                    response.status(400).json({message: "Bad Request submitting NQA response!"})
                else
                    if validSubmissionData.isInit
                        repoFiles1 = [
                            {name: request.files['qualification-doc'][0], ind: 0}
                        ]
                        @repoManager.addNQAInitialResponse validSubmissionData.devCode, repoFiles1, (repositorySingleError, commitHashSingle) =>
                            if repositorySingleError?
                                response.status(500).json({message: "Error adding the NQA initial response to the repository"})
                            else
                                handlerObject1 =
                                    handlerRef: @
                                    responseObject: response
                                @controller.submit validSubmissionData, handlerObject1
                    else
                        repoFiles2 = [
                            {name: request.files['qualification-doc'][0], ind: 0},
                            {name: request.files['response'][0], ind: 1}
                        ]
                        console.log "depicting the files..."
                        console.dir repoFiles
                        console.dir request.body
                        @repoManager.addNQACompleteResponse validSubmissionData.devCode, repoFiles2, (repositoryCompleteError, commitHashComplete) =>
                            if repositoryCompleteError?
                                response.status(500).json({message: "Error adding the NQA complete response to the repository"})
                            else
                                handlerObject2 =
                                    handlerRef: @
                                    responseObject: response
                                @controller.submit validSubmissionData, handlerObject2

        constructor: ->
            super()
            @controller = new QualificationsController
            @validator = new QualificationValidator
