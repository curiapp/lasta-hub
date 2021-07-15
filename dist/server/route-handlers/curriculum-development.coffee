'use strict'

# loading internal libraries
AbstractLocalRequestHandler     = require('./abstract-local').AbstractLocalRequestHandler
CurriculumDevelopmentController = require('../controllers/curriculum-development').CurriculumDevelopmentController
CurriculumDevelopmentValidator  = require('../validators/curriculum-development').CurriculumDevelopmentValidator

exports.CurriculumDevelopmentRequestHandler = class CurriculumDevelopmentRequestHandler
    _cdrhInstance = undefined

    @getInstance: ->
        _cdrhInstance ?= new _LocalCurriculumDevelopmentRequestHandler

    class _LocalCurriculumDevelopmentRequestHandler extends AbstractLocalRequestHandler

        submitToBos: (request, response) ->
            @validator.checkAndSanitizeForBOSSubmission request.body, (bosSubmissionDataError, validBosSubmissionData) =>
                if bosSubmissionDataError?
                    response.status(400).json({message: "Bad Request!"})
                else
                    handlerObject =
                        handlerRef: @
                        responseObject: response
                    @controller.submitToBos validBosSubmissionData, handlerObject

        documentBosAmendment: (request, response) ->
            @validator.checkAndSanitizeForBOSAmendment request.body, (bosAmendmentDataError, validBosAdmendmentData) =>
                if bosAmendmentDataError?
                    response.status(400).json({message: "Bad Request"})
                else
                    @repoManager.addBosAmendment validBosAdmendmentData.devCode, request.file, (repositoryError, commitHash) =>
                        if repositoryError?
                            response.status(500).json({message: "Error adding Bos amendment details to the repository"})
                        else
                            handlerObject =
                                handlerRef: @
                                responseObject: response
                            @controller.documentBosAmendment validBosAdmendmentData, handlerObject

        review: (request, response) ->
            @validator.checkAndSanitizeForReview request.body, (reviewCurriculumDataError, validReviewCurriculumData) =>
                if reviewCurriculumDataError?
                    response.status(400).json({message: "Bad Request!"})
                else
                    handlerObject =
                        handlerRef: @
                        responseObject: response
                    @controller.review validReviewCurriculumData, handlerObject

        recordAuthorizationFromBos: (request, response) ->
            @validator.checkAndSanitizeForBOSAuthorization request.body, (bosAuthorizationDataError, validBosAuthorizationData) =>
                if bosAuthorizationDataError?
                    response.status(400).json({message: "Bad Request!"})
                else
                    handlerObject =
                        handlerRef: @
                        responseObject: response
                    @controller.recordAuthorizationFromBos validBosAuthorizationData, handlerObject

        submitToSenate: (request, response) ->
            @validator.checkAndSanitizeForSenateSubmission request.body, (senateSubmissionDataError, validSenateSubmissionData) =>
                if senateSubmissionDataError?
                    response.status(400).json({message: "Bad Request!"})
                else
                    handlerObject =
                        handlerRef: @
                        responseObject: response
                    @controller.submitToSenate validSenateSubmissionData, handlerObject

        documentSenateAmendment: (request, response) ->
            @validator.checkAndSanitizeForSenateAmendment request.body, (senateAmendmentDataError, validSenateAmendmentData) =>
                if senateAmendmentDataError?
                    response.status(400).json({message: "Bad Request!"})
                else
                    @repoManager.addSenateAmendment validSenateAmendmentData.devCode, request.file, (repositoryError, commitHash) =>
                        if repositoryError?
                            response.status(500).json({message: "Error adding Senate amendment details to the repository"})
                        else
                            handlerObject =
                                handlerRef: @
                                responseObject: response
                            @controller.documentSenateAmendment validSenateAmendmentData, handlerObject

        recordAuthorizationFromSenate: (request, response) ->
            @validator.checkAndSanitizeForSenateAuthorization request.body, (senateAuthorizationDataError, validSenateAuthorizationData) =>
                if senateAuthorizationDataError?
                    response.status(400).json({message: "Bad Request!"})
                else
                    handlerObject =
                        handlerRef: @
                        responseObject: response
                    @controller.recordAuthorizationFromSenate validSenateAuthorizationData, handlerObject

        appointCDCMembers: (request, response) ->
            console.log "inside appointCDCMembers"
            console.dir request.body
            @validator.checkAndSanitizeForCDCAppointment request.body, (cdcDataError, validCDCData) =>
                if cdcDataError?
                    response.status(400).json({message: "Bad Request!"})
                else
                    handlerObject =
                        handlerRef: @
                        responseObject: response
                    @controller.appointCDCMembers validCDCData, handlerObject

        appointPACMembers: (request, response) ->
            console.log "inside appointPACMembers"
            console.dir request.body
            @validator.checkAndSanitizeForPACAppointment request.body, (pacDataError, validPACData) =>
                if pacDataError?
                    response.status(400).json({message: "Bad Request!"})
                else
                    handlerObject =
                        handlerRef: @
                        responseObject: response
                    @controller.appointPACMembers validPACData, handlerObject

        submitDraft: (request, response) ->
            @validator.checkAndSanitizeForDraftSubmission request.body, (draftSubmissionDataError, validDraftSubmissionData) =>
                if draftSubmissionDataError?
                    response.status(400).json({message: "Bad Request!"})
                else
                    handlerObject =
                        handlerRef: @
                        responseObject: response
                    @controller.submitDraft validDraftSubmissionData, handlerObject

        submitToColl: (request, response) ->
            @validator.checkAndSanitizeForCollSubmission request.body, (collDocSubmissionError, validCollDocSubmission) =>
                if collDocSubmissionError?
                    response.status(400).json({message: "Bad Request!"})
                else
                    @repoManager.addCollDocument validCollDocSubmission.devCode, request.file, (repositoryError, commitHash) =>
                        if repositoryError?
                            response.status(500).json({message: "Error submitting the COLL document!"})
                        else
                            handlerObject =
                                handlerRef: @
                                responseObject: response
                            @controller.submitToColl validCollDocSubmission, handlerObject

        reviseDraft: (request, response) ->
            @validator.checkAndSanitizeForDraftRevision request.body, (draftRevisionDataError, validDraftRevisionData) =>
                if draftRevisionDataError?
                    response.status(400).json({message: "Bad Request!"})
                else
                    @repoManager.addCurriculumDraftRevision validDraftRevisionData.devCode, request.file, (repositoryError, commitHash) =>
                        if repositoryError?
                            response.status(500).json({message: "Error adding a revision of the curriculum draft to the repository"})
                        else
                            handlerObject =
                                handlerRef: @
                                responseObject: response
                            @controller.reviseDraft validDraftRevisionData, handlerObject

        validateDraft: (request, response) ->
            @validator.checkAndSanitizeForDraftValidation request.body, (draftValidationDataError, validDraftValidationData) =>
                if draftValidationDataError?
                    response.status(400).json({message: "Bad Request!"})
                else
                    @repoManager.addCurriculumDraftCheckList validDraftRevisionData.devCode, request.file, validDraftValidationData.decision, (repositoryError, commitHash) =>
                        if repositoryError?
                            response.status(500).json({message: "Error adding a revision of the check list to the repository"})
                        else
                            handlerObject =
                                handlerRef: @
                                responseObject: response
                            @controller.validateDraft validDraftValidationData, handlerObject

        constructor: ->
            super()
            @controller = new CurriculumDevelopmentController
            @validator = new CurriculumDevelopmentValidator
