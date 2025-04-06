'use strict'

AbstractController = require('./abstract').AbstractController

exports.CurriculumDevelopmentController = class CurriculumDevelopmentController extends AbstractController
    constructor: ->
        super()

    appointPACMembers: (pacMemberData, handlerObject) ->
        @messageGenerator.generate pacMemberData, (cdcMemberMessageError, cdcMemberMessage) =>
            if cdcMemberMessageError?
                @continueWithHandler null, handlerObject, cdcMemberMessageError, null
            else
                @mqm.sendMessage 'cur-dev-appoint-cdc-req', cdcMemberMessage, (cdcMemberMessageSendError, cdcMemberMessageSendResult) =>
                    if cdcMemberMessageSendError?
                        @continueWithHandler null, handlerObject, cdcMemberMessageSendError, null
                    else
                        workerObject =
                            controllerRef: @
                            methodName: 'completeAppointCDCMembers'
                            handler: handlerObject
                        @workerManager.enqueue cdcMemberMessage.messageId, workerObject, (enqueueCDCMemberError, enqueueCDCMemberResult) =>
                            if enqueueCDCMemberError?
                                @continueWithHandler null, handlerObject, enqueueCDCMemberError, null
                            else
                                console.log "Enqueued the CDC member appointment. Waiting for the message from Microservice to proceed ..."

    completeAppointPACMembers: (pacAppointmentError, pacAppointmentResult, additionalArg, handlerObject) ->
        if pacAppointmentError?
            @continueWithHandler null, handlerObject, documentBosAmendmentError, null
        else
            @continueWithHandler null, handlerObject, null, pacAppointmentResult

    reviseDraft: (draftData, handlerObject) ->
        @messageGenerator.generate draftData, (draftDataMessageError, draftDataMessage) =>
            if draftDataMessageError?
                @continueWithHandler null, handlerObject, draftDataMessageError, null
            else
                @mqm.sendMessage 'cur-dev-draft-revise-req', draftDataMessage, (draftDataSendMessageError, draftDataSendMessageResult) =>
                    if draftDataSendMessageError?
                        @continueWithHandler null, handlerObject, draftDataSendMessageError, null
                    else
                        workerObject =
                            controllerRef: @
                            methodName: 'completeReviseDraft'
                            handler: handlerObject
                        @workerManager.enqueue draftDataMessage.messageId, workerObject, (enqueueDraftDataError, enqueueDraftDataResult) =>
                            if enqueueDraftDataError?
                                @continueWithHandler null, handlerObject, enqueueDraftDataError, null
                            else
                                console.log "Enqueued the draft revision. Waiting for the message from Microservice to proceed ..."

    completeReviseDraft: (draftRevisionError, draftRevisionResult, additionalArg, handlerObject) ->
        if draftRevisionError?
            @continueWithHandler null, handlerObject, draftRevisionError, null
        else
            @continueWithHandler null, handlerObject, null, draftRevisionResult

    submitDraft: (draftData, handlerObject) ->
        @messageGenerator.generate draftData, (draftDataMessageError, draftDataMessage) =>
            if draftDataMessageError?
                @continueWithHandler null, handlerObject, draftDataMessageError, null
            else
                @mqm.sendMessage 'cur-dev-draft-submit-req', draftDataMessage, (draftDataSendMessageError, draftDataSendMessageResult) =>
                    if draftDataSendMessageError?
                        @continueWithHandler null, handlerObject, draftDataSendMessageError, null
                    else
                        workerObject =
                            controllerRef: @
                            methodName: 'completeSubmitDraft'
                            handler: handlerObject
                        @workerManager.enqueue draftDataMessage.messageId, workerObject, (enqueueDraftDataError, enqueueDraftDataResult) =>
                            if enqueueDraftDataError?
                                @continueWithHandler null, handlerObject, enqueueDraftDataError, null
                            else
                                console.log "Enqueued the draft submission. Waiting for the message from Microservice to proceed ..."

    completeSubmitDraft: (drafSubmissionError, draftSubmissionResult, additionalArg, handlerObject) ->
        if drafSubmissionError?
            @continueWithHandler null, handlerObject, drafSubmissionError, null
        else
            @continueWithHandler null, handlerObject, null, draftSubmissionResult

    validateDraft: (draftData, handlerObject) ->
        @messageGenerator.generate draftData, (draftDataMessageError, draftDataMessage) =>
            if draftDataMessageError?
                @continueWithHandler null, handlerObject, draftDataMessageError, null
            else
                @mqm.sendMessage 'cur-dev-draft-validate-req', draftDataMessage, (draftDataSendMessageError, draftDataSendMessageResult) =>
                    if draftDataSendMessageError?
                        @continueWithHandler null, handlerObject, draftDataSendMessageError, null
                    else
                        workerObject =
                            controllerRef: @
                            methodName: 'completeValidateDraft'
                            handler: handlerObject
                        @workerManager.enqueue draftDataMessage.messageId, workerObject, (enqueueDraftDataError, enqueueDraftDataResult) =>
                            if enqueueDraftDataError?
                                @continueWithHandler null, handlerObject, enqueueDraftDataError, null
                            else
                                console.log "Enqueued the draft validation. Waiting for the message from Microservice to proceed ..."

    completeValidateDraft: (drafValidationError, draftValidationResult, additionalArg, handlerObject) ->
        if drafValidationError?
            @continueWithHandler null, handlerObject, drafValidationError, null
        else
            @continueWithHandler null, handlerObject, null, draftValidationResult

    review: (reviewData, handlerObject) ->
        @messageGenerator.generate reviewData, (reviewMessageError, reviewMessage) =>
            if reviewMessageError?
                @continueWithHandler null, handlerObject, reviewMessageError, null
            else
                @mqm.sendMessage 'curriculum-review-req', reviewMessage, (reviewMessageSendError, reviewMessageSendResult) =>
                    if reviewMessageSendError?
                        @continueWithHandler null, handlerObject, reviewMessageSendError, null
                    else
                        workerObject =
                            controllerRef: @
                            methodName: 'completeReview'
                            handler: handlerObject
                        @workerManager.enqueue reviewMessage.messageId, workerObject, (enqueueReviewError, enqueueReviewResult) =>
                            if enqueueReviewError?
                                @continueWithHandler null, handlerObject, enqueueReviewError, null
                            else
                                console.log "Enqueued the review of programme. Waiting for the message from Microservice to proceed ..."

    completeReview: (reviewError, reviewResult, additionalArg, handlerObject) ->
        if reviewError?
            @continueWithHandler null, handlerObject, reviewError, null
        else
            @continueWithHandler null, handlerObject, null, reviewResult


    documentBosAmendment: (documentData, handlerObject) ->
        documentData["action"] = 'bos-amend'
        @messageGenerator.generate documentData, (bosAmendmentMessageError, bosAmendmentMessage) =>
            if bosAmendmentMessageError?
                @continueWithHandler null, handlerObject, bosAmendmentMessageError, null
            else
                @mqm.sendMessage 'cur-dev-amendment-from-bos-req', bosAmendmentMessage, (bosAmendmentMessageSendError, bosAmendmentMessageSendResult) =>
                    if bosAmendmentMessageSendError?
                        @continueWithHandler null, handlerObject, bosAmendmentMessageSendError, null
                    else
                        workerObject =
                            controllerRef: @
                            methodName: 'completeDocumentBosAmendment'
                            handler: handlerObject
                        @workerManager.enqueue bosAmendmentMessage.messageId, workerObject, (enqueueDocumentBosAmendmentError, enqueueDocumentBosAmendmentResult) =>
                            if enqueueDocumentBosAmendmentError?
                                @continueWithHandler null, handlerObject, enqueueDocumentBosAmendmentError, null
                            else
                                console.log "Enqueued the BOS amendment documentation. Waiting for the message from Microservice to proceed ..."

    completeDocumentBosAmendment: (documentBosAmendmentError, documentBosAmendmentResult, additionalArg, handlerObject) ->
        if documentBosAmendmentError?
            @continueWithHandler null, handlerObject, documentBosAmendmentError, null
        else
            @continueWithHandler null, handlerObject, null, documentBosAmendmentResult

    appointCDCMembers: (cdcMemberData, handlerObject) ->
        @messageGenerator.generate cdcMemberData, (cdcMemberMessageError, cdcMemberMessage) =>
            if cdcMemberMessageError?
                @continueWithHandler null, handlerObject, cdcMemberMessageError, null
            else
                @mqm.sendMessage 'cur-dev-appoint-cdc-req', cdcMemberMessage, (cdcMemberMessageSendError, cdcMemberMessageSendResult) =>
                    if cdcMemberMessageSendError?
                        @continueWithHandler null, handlerObject, cdcMemberMessageSendError, null
                    else
                        workerObject =
                            controllerRef: @
                            methodName: 'completeAppointCDCMembers'
                            handler: handlerObject
                        @workerManager.enqueue cdcMemberMessage.messageId, workerObject, (enqueueCDCMemberError, enqueueCDCMemberResult) =>
                            if enqueueCDCMemberError?
                                @continueWithHandler null, handlerObject, enqueueCDCMemberError, null
                            else
                                console.log "Enqueued the CDC member appointment. Waiting for the message from Microservice to proceed ..."


    completeAppointCDCMembers: (cdcAppointmentError, cdcAppointmentResult, additionalArg, handlerObject) ->
        if cdcAppointmentError?
            @continueWithHandler null, handlerObject, cdcAppointmentError, null
        else
            @continueWithHandler null, handlerObject, null, cdcAppointmentResult

    submitToColl: (collDocData, handlerObject) ->
        @messageGenerator.generate collDocData, (collDocDataMessageError, collDocDataMessage) =>
            if collDocDataMessageError?
                @continueWithHandler null, handlerObject, collDocSubmissionError, null
            else
                @mqm.sendMessage 'cur-dev-coll-submit-req', collDocDataMessage, (collDocDataSendMessageError, collDocDataSendMessageResult) =>
                    if collDocDataSendMessageError?
                        @continueWithHandler null, handlerObject, collDocDataSendMessageError, null
                    else
                        workerObject =
                            controllerRef: @
                            methodName: 'completeSubmissionToColl'
                            handler: handlerObject
                        @workerManager.enqueue collDocDataMessage.messageId, workerObject, (enqueueCollDocError, enqueueCollDocResult) =>
                            if enqueueCollDocError?
                                @continueWithHandler null, handlerObject, enqueueCollDocError, null
                            else
                                console.log "Enqueued the submission to COLL. Waiting for the message from Microservice to proceed ..."

    completeSubmissionToColl: (submitToCollError, submitToCollResult, additionalArg, handlerObject) ->
        if submitToCollError?
            @continueWithHandler null, handlerObject, submitToCollError, null
        else
            @continueWithHandler null, handlerObject, null, submitToCollResult
