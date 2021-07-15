'use strict'

AbstractController = require('./abstract').AbstractController

exports.NeedAnalysesController = class NeedAnalysesController extends AbstractController
    startNeedAnalysis: (initData, handlerObject) ->
        progData =
            faculty: initData.faculty
            department: initData.department
            name: initData.name
            level: initData.level
            isPreProgramme: true
            preProgComponent:
                devCode: initData.devCode
                initiator: initData.initiator
        @messageGenerator.generate progData, (startNeedAnalysisMessageError, startNeedAnalysisMessage) =>
            if startNeedAnalysisMessageError?
                @continueWithHandler null, handlerObject, startNeedAnalysisMessageError, null
            else
                @mqm.sendMessage 'need-analysis-start-req', startNeedAnalysisMessage, (startNeedAnalysisMessageSendError, startNeedAnalysisMessageSendResult) =>
                    if startNeedAnalysisMessageSendError?
                        @continueWithHandler null, handlerObject, startNeedAnalysisMessageSendError, null
                    else
                        workerObject =
                            controllerRef: @
                            methodName: 'completeStartNeedAnalysis'
                            handler: handlerObject
                        @workerManager.enqueue startNeedAnalysisMessage.messageId, workerObject, (enqueueStartNeedAnalysisError, enqueueStartNeedAnalysisResult) =>
                            if enqueueStartNeedAnalysisError?
                                @continueWithHandler null, handlerObject, enqueueStartNeedAnalysisError, null
                            else
                                console.log "Enqueued the start need analysis work. Waiting for the message from Micro service to proceed..."

    completeStartNeedAnalysis: (startNeedAnalysisError, startNeedAnalysisResult, additionalArg, handlerObject) ->
        if startNeedAnalysisError?
            @continueWithHandler null, handlerObject, startNeedAnalysisError, null
        else
            @continueWithHandler null, handlerObject, null, startNeedAnalysisResult

    submitConsultationDetails: (consultationData, handlerObject) ->
        @messageGenerator.generate consultationData, (consultInNeedAnalysisMessageError, consultInNeedAnalysisMessage) =>
            if consultInNeedAnalysisMessageError?
                @continueWithHandler null, handlerObject, consultInNeedAnalysisMessageError, null
            else
                @mqm.sendMessage 'need-analysis-consult-req', consultInNeedAnalysisMessage, (consultInNeedAnalysisMessageSendError, consultInNeedAnalysisMessageSendResult) =>
                    if consultInNeedAnalysisMessageSendError?
                        @continueWithHandler null, handlerObject, consultInNeedAnalysisMessageSendError, null
                    else
                        workerObject =
                            controllerRef: @
                            methodName: 'completeConsultInNeedAnalysis'
                            handler: handlerObject
                        @workerManager.enqueue consultInNeedAnalysisMessage.messageId, workerObject, (enqueueConsultNeedAnalysisError, enqueueConsultNeedAnalysisResult) =>
                            if enqueueConsultNeedAnalysisError?
                                @continueWithHandler null, handlerObject, enqueueConsultNeedAnalysisError, null
                            else
                                console.log "Enqueued the consult in need analysis work. Waiting for the message from Micro service to proceed..."

    completeConsultInNeedAnalysis: (consultInNeedAnalysisError, consultInNeedAnalysisResult, additionalArg, handlerObject) ->
        if consultInNeedAnalysisError?
            @continueWithHandler null, handlerObject, consultInNeedAnalysisError, null
        else
            @continueWithHandler null, handlerObject, null, consultInNeedAnalysisResult

    conclude: (conclusionData, handlerObject) ->
        @messageGenerator.generate conclusionData, (conclusionMessageError, conclusionMessage) =>
            if conclusionMessageError?
                @continueWithHandler null, handlerObject, conclusionMessageError, null
            else
                @mqm.sendMessage 'need-analysis-conclude-req', conclusionMessage, (conclusionMessageSendError, conclusionMessageSendRes) =>
                    if conclusionMessageSendError?
                        @continueWithHandler null, handlerObject, conclusionMessageSendError, null
                    else
                        workerObject =
                            controllerRef: @
                            methodName: 'completeConcludeNeedAnalysis'
                            handler: handlerObject
                        @workerManager.enqueue conclusionMessage.messageId, workerObject, (enqueueConcludeNeedAnalysisError, enqueueConcludeNeedAnalysisRes) =>
                            if enqueueConcludeNeedAnalysisError?
                                @continueWithHandler null, handlerObject, enqueueConcludeNeedAnalysisError, null
                            else
                                console.log "Enqueued the conclusion of need analysis work. Waiting for the message from Micro service to proceed..."

    completeConcludeNeedAnalysis: (concludeNeedAnalysisError, concludeNeedAnalysisResult, additionalArg, handlerObject) ->
        if concludeNeedAnalysisError?
            @continueWithHandler null, handlerObject, concludeNeedAnalysisError, null
        else
            @continueWithHandler null, handlerObject, null, concludeNeedAnalysisResult

    submitSurvey: (surveyData, handlerObject) ->
        @messageGenerator.generate surveyData, (surveyMessageError, surveyMessage) =>
            if surveyMessageError?
                @continueWithHandler null, handlerObject, surveyMessageError, null
            else
                @mqm.sendMessage 'need-analysis-survey-req', surveyMessage, (surveyMessageSendError, surveyMessageSendRes) =>
                    if surveyMessageSendError?
                        @continueWithHandler null, handlerObject, surveyMessageSendError, null
                    else
                        workerObject =
                            controllerRef: @
                            methodName: 'completeSubmitSurvey'
                            handler: handlerObject
                        @workerManager.enqueue surveyMessage.messageId, workerObject, (enqueueSubmitSurveyError, enqueueSubmitSurveyRes) =>
                            if enqueueSubmitSurveyError?
                                @continueWithHandler null, handlerObject, enqueueSubmitSurveyError, null
                            else
                                console.log "Enqueued the survey submission work. Waiting for the message from Micro service to proceed ..."

    completeSubmitSurvey: (surveyError, surveyResult, additionalArg, handlerObject) ->
        if surveyError?
            @continueWithHandler null, handlerObject, surveyError, null
        else
            @continueWithHandler null, handlerObject, null, surveyResult

    startBOSPhase: (bosStartupData, handlerObject) ->
        console.log "inside start bos phase controller"
        @messageGenerator.generate bosStartupData, (bosStartupMessageError, bosStartupMessage) =>
            if bosStartupMessageError?
                @continueWithHandler null, handlerObject, bosStartupMessageError, null
            else
                console.log "message generated ..."
                @mqm.sendMessage 'need-analysis-bos-start-req', bosStartupMessage, (bosStartupMessageSendError, bosStartupMessageSendRes) =>
                    if bosStartupMessageSendError?
                        @continueWithHandler null, handlerObject, bosStartupMessageSendError, null
                    else
                        console.log "message sent"
                        workerObject =
                            controllerRef: @
                            methodName: 'completeStartBos'
                            handler: handlerObject
                        @workerManager.enqueue bosStartupMessage.messageId, workerObject, (enqueueStartBosError, enqueueStartBosRes) =>
                            if enqueueStartBosError?
                                console.log "error enqueuing,,,"
                                @continueWithHandler null, handlerObject, enqueueStartBosError, null
                            else
                                console.log "Enqueued the bos startup work. Waiting for the message from Micro service to proceed ..."

    completeStartBos: (bosStartupError, bosStartupResult, additionalArg, handlerObject) ->
        if bosStartupError?
            @continueWithHandler null, handlerObject, bosStartupError, null
        else
            @continueWithHandler null, handlerObject, null, bosStartupResult

    handleBOSRecommendations: (bosAmendmentData, handlerObject) ->
        @messageGenerator.generate bosAmendmentData, (bosAmendmentMessageError, bosAmendmentMessage) =>
            if bosAmendmentMessageError?
                @continueWithHandler null, handlerObject, bosAmendmentMessageError, null
            else
                @mqm.sendMessage 'need-analysis-bos-recommend-req', bosAmendmentMessage, (bosAmendmendMessageSendError, bosAmendmentMessageSendRes) =>
                    if bosAmendmendMessageSendError?
                        @continueWithHandler null, handlerObject, bosAmendmendMessageSendError, null
                    else
                        workerObject =
                            controllerRef: @
                            methodName: 'completeBosAmendment'
                            handler: handlerObject
                        @workerManager.enqueue bosAmendmentMessage.messageId, workerObject, (enqueueBosAmendmentError, enqueueBosAmendmentRes) =>
                            if enqueueBosAmendmentError?
                                @continueWithHandler null, handlerObject, enqueueBosAmendmentError, null
                            else
                                console.log "Enqueued the bos amendment work. Waiting for the message from Micro service to proceed ..."

    completeBosAmendment: (bosAmendmentError, bosAmendmentResult, additionalArg, handlerObject) ->
        if bosAmendmentError?
            @continueWithHandler null, handlerObject, bosAmendmentError, null
        else
            @continueWithHandler null, handlerObject, null, bosAmendmentResult

    handleSenateRecommendations: (senateAmendmentData, handlerObject) ->
        @messageGenerator.generate senateAmendmentData, (senateAmendmentMessageError, senateAmendmentMessage) =>
            if senateAmendmentMessageError?
                @continueWithHandler null, handlerObject, senateAmendmentMessageError, null
            else
                @mqm.sendMessage 'need-analysis-senate-recommend-req', senateAmendmentMessage, (senateAmendmendMessageSendError, senateAmendmentMessageSendRes) =>
                    if senateAmendmendMessageSendError?
                        @continueWithHandler null, handlerObject, senateAmendmendMessageSendError, null
                    else
                        workerObject =
                            controllerRef: @
                            methodName: 'completeSenateAmendment'
                            handler: handlerObject
                        @workerManager.enqueue senateAmendmentMessage.messageId, workerObject, (enqueueSenateAmendmentError, enqueueSenateAmendmentRes) =>
                            if enqueueSenateAmendmentError?
                                @continueWithHandler null, handlerObject, enqueueSenateAmendmentError, null
                            else
                                console.log "Enqueued the senate amendment work. Waiting for the message from Micro service to proceed ..."

    completeSenateAmendment: (senateAmendmentError, senateAmendmentResult, additionalArg, handlerObject) ->
        if senateAmendmentError?
            @continueWithHandler null, handlerObject, senateAmendmentError, null
        else
            @continueWithHandler null, handlerObject, null, senateAmendmentResult

    startSenatePhase = (senateStartupData, handlerObject) ->
        @messageGenerator.generate senateStartupData, (senateStartupMessageError, senateStartupMessage) =>
            if senateStartupMessageError?
                @continueWithHandler null, handlerObject, senateStartupMessageError, null
            else
                @mqm.sendMessage 'need-analysis-senate-start-req', senateStartupMessage, (senateStartupMessageSendError, senateStartupMessageSendRes) =>
                    if senateStartupMessageSendError?
                        @continueWithHandler null, handlerObject, senateStartupMessageSendError, null
                    else
                        workerObject =
                            controllerRef: @
                            methodName: 'completeStartSenate'
                            handler: handlerObject
                        @workerManager.enqueue senateStartupMessage.messageId, workerObject, (enqueueStartSenateError, enqueueStartSenateRes) =>
                            if enqueueStartSenateError?
                                @continueWithHandler null, handlerObject, enqueueStartSenateError, null
                            else
                                console.log "Enqueued the senate startup work. Waiting for the message from Micro service to proceed ..."

    completeStartSenate = (senateStartupError, senateStartupResult, additionalArg, handlerObject) ->
        if senateStartupError?
            @continueWithHandler null, handlerObject, senateStartupError, null
        else
            @continueWithHandler null, handlerObject, null, senateStartupResult

    constructor: ->
        super()
