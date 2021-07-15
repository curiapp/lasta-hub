'use strict'

AbstractController = require('./abstract').AbstractController

exports.ConsultationsController = class ConsultationsController extends AbstractController

    startPACConsultations: (consultationData, handlerObject) ->
        @messageGenerator.generate consultationData, (consultationDataMessageError, consultationDataMessage) =>
            if consultationDataMessageError?
                @continueWithHandler null, handlerObject, consultationDataMessageError, null
            else
                @mqm.sendMessage 'consult-start-pac-req', consultationDataMessage, (consultationDataSendMessageError, consultationDataSendMessageResult) =>
                    if consultationDataSendMessageError?
                        @continueWithHandler null, handlerObject, consultationDataSendMessageError, null
                    else
                        workerObject =
                            controllerRef: @
                            methodName: 'continueStartPACConsultations'
                            handler: handlerObject
                        @workerManager.enqueue consultationDataMessage.messageId, workerObject, (enqueueConsultationDataError, enqueueConsultationDataResult) =>
                            if enqueueConsultationDataError?
                                @continueWithHandler null, handlerObject, enqueueConsultationDataError, null
                            else
                                console.log "Enqueued the start pac consultations. Waiting for the message from Microservice to proceed ..."

    continueStartPACConsultations: (pacConsultationError, pacConsultationResult, additionalArg, handlerObject) ->
        if pacConsultationError?
            @continueWithHandler null, handlerObject, pacConsultationError, null
        else
            @continueWithHandler null, handlerObject, null, pacConsultationResult

    addBenchmark: (benchmarkData, handlerObject) ->
        @messageGenerator.generate benchmarkData, (benchmarkDataMessageError, benchmarkDataMessage) =>
            if benchmarkDataMessageError?
                @continueWithHandler null, handlerObject, benchmarkDataMessageError, null
            else
                @mqm.sendMessage 'consult-benchmark-req', benchmarkDataMessage, (benchmarkDataSendMessageError, benchmarkDataSendMessageResult) =>
                    if benchmarkDataSendMessageError?
                        @continueWithHandler null, handlerObject, benchmarkDataSendMessageError, null
                    else
                        workerObject =
                            controllerRef: @
                            methodName: 'continueAddBenchmark'
                            handler: handlerObject
                        @workerManager.enqueue benchmarkDataMessage.messageId, workerObject, (enqueueBenchmarkDataError, enqueueBenchmarkDataResult) =>
                            if enqueueBenchmarkDataError?
                                @continueWithHandler null, handlerObject, enqueueBenchmarkDataError, null
                            else
                                console.log "Enqueued the benchmark request. Waiting for the message from Microservice to proceed ..."

    continueAddBenchmark: (benchmarkError, benchmarkResult, additionalArg, handlerObject) ->
        if benchmarkError?
            @continueWithHandler null, handlerObject, benchmarkError, null
        else
            @continueWithHandler null, handlerObject, null, benchmarkResult

    addFinalDraft: (finalDraftData, handlerObject) ->
        @messageGenerator.generate finalDraftData, (finalDraftDataMessageError, finalDraftDataMessage) =>
            if finalDraftDataMessageError?
                @continueWithHandler null, handlerObject, finalDraftDataMessageError, null
            else
                @mqm.sendMessage 'consult-final-draft-req', finalDraftDataMessage, (finalDraftDataSendMessageError, finalDraftDataSendMessageResult) =>
                    if finalDraftDataSendMessageError?
                        @continueWithHandler null, handlerObject, finalDraftDataSendMessageError, null
                    else
                        workerObject =
                            controllerRef: @
                            methodName: 'continueAddFinalDraft'
                            handler: handlerObject
                        @workerManager.enqueue finalDraftDataMessage.messageId, workerObject, (enqueueFinalDraftDataError, enqueueFinalDraftDataResult) =>
                            if enqueueFinalDraftDataError?
                                @continueWithHandler null, handlerObject, enqueueFinalDraftDataError, null
                            else
                                console.log "Enqueued the final draft request. Waiting for the message from Microservice to proceed ..."

    continueAddFinalDraft: (finalDraftError, finalDraftResult, additionalArg, handlerObject) ->
        if finalDraftError?
            @continueWithHandler null, handlerObject, finalDraftError, null
        else
            @continueWithHandler null, handlerObject, null, finalDraftResult

    endorse: (endorsementData, handlerObject) ->
        @messageGenerator.generate endorsementData, (endorsementDataMessageError, endorsementDataMessage) =>
            if endorsementDataMessageError?
                @continueWithHandler null, handlerObject, endorsementDataMessageError, null
            else
                @mqm.sendMessage 'consult-endorse-req', endorsementDataMessage, (endorsementDataSendMessageError, endorsementDataSendMessageResult) =>
                    if endorsementDataSendMessageError?
                        @continueWithHandler null, handlerObject, endorsementDataSendMessageError, null
                    else
                        workerObject =
                            controllerRef: @
                            methodName: 'continueEndorse'
                            handler: handlerObject
                        @workerManager.enqueue endorsementDataMessage.messageId, workerObject, (enqueueEndorsementDataError, enqueueEndorsementDataResult) =>
                            if enqueueEndorsementDataError?
                                @continueWithHandler null, handlerObject, enqueueEndorsementDataError, null
                            else
                                console.log "Enqueued the endorsement request. Waiting for the message from Microservice to proceed ..."

    continueEndorse: (endorseError, endorseResult, additionalArg, handlerObject) ->
        if endorseError?
            @continueWithHandler null, handlerObject, endorseError, null
        else
            @continueWithHandler null, handlerObject, null, endorseResult

    constructor: ->
        super()
