'use strict'

fs     = require 'fs-extra'
git    = require 'simple-git'
moment = require 'moment'
path   = require 'path'
async  = require 'async'

exports.RepositoryManager = class RepositoryManager
    _rmInstance = undefined

    @getInstance: ->
        _rmInstance ?= new _LocalRepositoryManager

    class _LocalRepositoryManager

        addNeedAnalysisConsultation: (devCode, oldFileName, callback) ->
            @addFileToRepo devCode, oldFileName, 'need-analysis/consultation/', 'consult', "Added consultation document for #{devCode} need analysis", true, (addNAConsFileError, addNAConsFileRes) =>
                callback addNAConsFileError, addNAConsFileRes

        addNeedAnalysisSurvey: (devCode, oldFile, callback) ->
            @addFileToRepo devCode, oldFile, 'need-analysis/survey/', 'survey', "Added survey document for #{devCode} need analysis", false, (addNAConclFileError, addNAConclFileRes) =>
                callback addNAConclFileError, addNAConclFileRes

        addBosAmendment: (devCode, oldFileName, decSuffix, callback) ->
            expandedContext = "amend-#{decSuffix}"
            @addFileToRepo devCode, oldFileName, 'need-analysis/bos/', expandedContext, "Added amendment from BOS for #{devCode} need analysis", false, (addCDBosAmendmentFileError, addCDBosAmendmentFileRes) =>
                callback addCDBosAmendmentFileError, addCDBosAmendmentFileRes

        addSenateAmendment: (devCode, oldFileName, decSuffix, callback) ->
            expandedContext = "amend-#{decSuffix}"
            @addFileToRepo devCode, oldFileName, 'need-analysis/senate/', expandedContext, "Added amendment from Senate for #{devCode} need analysis", false, (addCDSenateAmendmentFileError, addCDSenateAmendmentFileRes) =>
                callback addCDSenateAmendmentFileError, addCDSenateAmendmentFileRes

        addAPCAmendment: (devCode, oldFileName, decSuffix, callback) ->
            expandedContext = "amend-#{decSuffix}"
            @addFileToRepo devCode, oldFileName, 'need-analysis/apc/', expandedContext, "Added amendment from APC for #{devCode} need analysis", false, (addCDAPCAmendmentFileError, addCDAPCAmendmentFileRes) =>
                callback addCDAPCAmendmentFileError, addCDAPCAmendmentFileRes

        addCurriculumDraft: (devCode, oldFileName, callback) ->
            @addFileToRepo devCode, oldFileName, 'curriculum-development/draft/', 'submit', "Added first draft of curriculum for #{devCode}", false, (addCDDraftFileError, addCDDraftFileRes) =>
                callback addCDDraftFileError, addCDDraftFileRes

        addCurriculumDraftRevision: (devCode, oldFileName, callback) ->
            @addFileToRepo devCode, oldFileName, 'curriculum-development/draft/', 'revise', "Added a revision of the curriculum draft for #{devCode}", false, (addCDDraftRevisionFileError, addCDDraftRevisionFileRes) =>
                callback addCDDraftRevisionFileError, addCDDraftRevisionFileRes

        addNeedAnalysisChecklist: (devCode, oldFileName, decSuffix, callback) ->
            expandedContext = "checklist-#{decSuffix}"
            @addFileToRepo devCode, oldFileName, 'need-analysis/bos/', expandedContext, "Added check list for #{devCode} need analysis", false, (addChecklistFileError, addChecklistFileRes) =>
                callback addChecklistFileError, addChecklistFileRes

        addCurriculumDraftCheckList: (devCode, oldFileName, decSuffix, callback) ->
            expandedContext = "checklist-#{decSuffix}"
            @addFileToRepo devCode, oldFileName, 'curriculum-development/draft/', expandedContext, "Added a check list for the curriculum draft for #{devCode}", false, (addChecklistFileError, addChecklistFileRes) =>
                callback addChecklistFileError, addChecklistFileRes

        addConsultation: (devCode, oldFileName, callback) ->
            @addFileToRepo devCode, oldFileName, 'consultation/', 'pac-start', "Added pac consultation start for #{devCode}", false, (consultationFileError, consultationFileRes) =>
                callback consultationFileError, consultationFileRes

        addBenchmark: (devCode, oldFileName, callback) ->
            @addFileToRepo devCode, oldFileName, 'benchmark/', 'benchmark', "Added benchmark file for #{devCode}", false, (benchmarkFileError, benchmarkFileResult) =>
                callback benchmarkFileError, benchmarkFileResult

        addEndorsement: (devCode, oldFileName, decSuffix, callback) ->
            expandedContext = "endorsement-#{decSuffix}"
            @addFileToRepo devCode, oldFileName, 'consultation/', expandedContext, "Added endorsement file for #{devCode}", false, (endorsementFileError, endorsementFileResult) =>
                callback endorsementFileError, endorsementFileResult

        addFinalDraft: (devCode, oldFileName, callback) ->
            @addFileToRepo devCode, oldFileName, 'consultation/', 'final-draft', "Added final draft file for #{devCode}", false, (finalDraftFileError, finalDraftFileResult) =>
                callback finalDraftFileError, finalDraftFileResult

        startReview: (devCode, oldFileName, callback) ->
            console.log "inside start review"
            console.log "devCode = #{devCode} and oldFileName = #{oldFileName}"
            console.dir oldFileName
            @addFileToRepo devCode, oldFileName, 'reviews/', 'start', "Added start review file for #{devCode}", true, (startReviewFileError, startReviewFileResult) =>
                callback startReviewFileError, startReviewFileResult

        recommendReview: (devCode, oldFileName, decSuffix, callback) ->
            expandedContext = "recommend-#{decSuffix}"
            @addFileToRepo devCode, oldFileName, 'reviews/', expandedContext, "Added recommendation file for #{devCode}", true, (recommendReviewFileError, recommendReviewFileRes) =>
                callback recommendReviewFileError, recommendReviewFileRes

        addBOSDraft: (devCode, oldFileName, callback) ->
            @addFileToRepo devCode, oldFileName, 'bos-senate/', 'bos-draft', "Added BOS draft file for #{devCode}", true, (addBOSDraftFileError, addBOSDraftFileRes) =>
                callback addBOSDraftFileError, addBOSDraftFileRes

        addFacultyRecommendation: (devCode, oldFileName, decSuffix, callback) ->
            expandedContext = "recommend-#{decSuffix}"
            @addFileToRepo devCode, oldFileName, 'bos-senate/', expandedContext, "Added Faculty recommendation file for #{devCode}", true, (facRecommendationFileError, facRecommendationFileRes) =>
                callback facRecommendationFileError, facRecommendationFileRes

        addOtherFacultyRecommendation: (devCode, oldFileName, decSuffix, callback) ->
            expandedContext = "recommend-#{decSuffix}"
            @addFileToRepo devCode, oldFileName, 'bos-senate/', expandedContext, "Added other Faculty recommendation file for #{devCode}", true, (facRecommendationFileError, facRecommendationFileRes) =>
                callback facRecommendationFileError, facRecommendationFileRes

        addAPCRecommendation: (devCode, oldFileName, decSuffix, callback) ->
            expandedContext = "recommend-#{decSuffix}"
            @addFileToRepo devCode, oldFileName, 'bos-senate/', expandedContext, "Added APC recommendation file for #{devCode}", true, (apcRecommendationFileErr, apcRecommendationFileRes) =>
                callback apcRecommendationFileErr, apcRecommendationFileRes

        addSenateFinalRecommendation: (devCode, oldFileName, decSuffix, callback) ->
            expandedContext = "recommend-#{decSuffix}"
            @addFileToRepo devCode, oldFileName, 'bos-senate/', expandedContext, "Added Senate recommendation file for #{devCode}", true, (recommendationFileErr, recommendationFileRes) =>
                callback recommendationFileErr, recommendationFileRes

        addNQAPreparation: (devCode, oldFileNames, callback) ->
            addFileFuncs = oldFileNames.map (oldFileNameIter) =>
                curFileFunc = (partialMemberCallback) =>
                    extraContext = "prepare-#{oldFileNameIter.ind}"
                    @addFileToRepo devCode, oldFileNameIter.name, 'nqa/', extraContext, "Added NQA preparation file for #{devCode}", true, (fileErr, fileRes) =>
                        partialMemberCallback fileErr, fileRes
                return curFileFunc
            async.series addFileFuncs, (nqaPreparationFilesError, nqaPreparationFilesRes) =>
                callback nqaPreparationFilesError, nqaPreparationFilesRes

        addPDURecommendation: (devCode, oldFileName, decSuffix, callback) ->
            expandedContext = "recommend-#{decSuffix}/"
            @addFileToRepo devCode, oldFileName, 'nqa/', expandedContext, "Added PDU recommendation file for #{devCode}", true, (recommendationFileErr, recommendationFileRes) =>
                callback recommendationFileErr, recommendationFileRes

        addNQARecommendation: (devCode, oldFileName, decSuffix, callback) ->
            expandedContext = "recommend-#{decSuffix}/"
            @addFileToRepo devCode, oldFileName, 'nqa/', expandedContext, "Added NQA recommendation file for #{devCode}", true, (recommendationFileErr, recommendationFileRes) =>
                callback recommendationFileErr, recommendationFileRes

        addProgrammeDocument: (devCode, oldFileName, callback) ->
            @addFileToRepo devCode, oldFileName, 'nqa/', 'registration', "Added Programme document file for #{devCode}", true, (progDocFileErr, progDocFileRes) =>
                callback progDocFileErr, progDocFileRes

        addCollDocument: (devCode, oldFileName, callback) ->
            @addFileToRepo devCode, oldFileName, 'reviews/', 'coll', "Added Programme document file for COLL for #{devCode}", true, (collDocFileErr, collDocFileRes) =>
                callback collDocFileErr, collDocFileRes

        addNQAInitialResponse: (devCode, oldFileNames, callback) ->
            expandedContext = "draft-#{oldFileNames[0].ind}"
            @addFileToRepo devCode, oldFileNames[0].name, 'nqa/', expandedContext, "Added programme draft file for #{devCode}", true, (fileErr, fileRes) =>
                callback fileErr, fileRes

        addNQACompleteResponse: (devCode, oldFileNames, callback) ->
            addFileFuncs = []
            draftFileFunc = (draftPartialCallback) =>
                @addFileToRepo devCode, oldFileNames[0].name, 'nqa/', "draft-#{oldFileNames[0].ind}", "Added programme draft file for #{devCode}", true, (fileErr, fileRes) =>
                    draftPartialCallback fileErr, fileRes
            addFileFuncs.push draftFileFunc
            respFileFunc = (respPartialCallback) =>
                @addFileToRepo devCode, oldFileNames[1].name, 'nqa/', "response-#{oldFileNames[1].ind}", "Added response file for #{devCode}", true, (fileErr, fileRes) =>
                    respPartialCallback fileErr, fileRes
            addFileFuncs.push respFileFunc
            async.series addFileFuncs, (nqaSubmissionFilesError, nqaSubmissionFilesRes) =>
                callback nqaSubmissionFilesError, nqaSubmissionFilesRes

        addNQAResponse: (devCode, isInit, oldFileNames, callback) ->
            console.log "inside addNQAResponse...."
            console.log "devCode = #{devCode}"
            console.log "isInit = #{isInit}"
            console.dir oldFileNames
            addFileFuncs = []
            console.log "creating file functions..."
            draftFileFunc = (draftPartialCallback) =>
                @addFileToRepo devCode, oldFileNames[0], 'nqa/', 'draft', "Added programme draft file for #{devCode}", true, (fileErr, fileRes) =>
                    draftPartialCallback fileErr, fileRes
            addFileFuncs.push draftFileFunc
            if isInit
                console.log "this is the initial submission... no response is expected..."
            else
                respFileFunc = (respPartialCallback) =>
                    @addFileToRepo devCode, oldFileNames[1], 'nqa/', 'response', "Added response file for #{devCode}", true, (fileErr, fileRes) =>
                        respPartialCallback fileErr, fileRes
                addFileFuncs.push respFileFunc
            # if not isInit
            #     respFileFunc = (respPartialCallback) ->
            #         _addFileToRepo.call @, devCode, oldFileNames[1], 'nqa/', 'response', "Added response file for #{devCode}", true, (fileErr, fileRes) =>
            #             respPartialCallback fileErr, fileRes
            #     addFileFuncs.push respFileFunc
            console.log "calling all stations now... Can anybody tell me where we are?"
            console.dir addFileFuncs
            console.log addFileFuncs.length
            async.series addFileFuncs, (nqaSubmissionFilesError, nqaSubmissionFilesRes) =>
                callback nqaSubmissionFilesError, nqaSubmissionFilesRes

        addConsultationRecord: (devCode, oldFileNames, callback) ->
            theFileFuncs = []
            endorseFileFunc = (endorsePartialCallback) =>
                @addFileToRepo devCode, oldFileNames[0], 'consultation/', 'endorsement', "Added endorsement file for #{devCode}", true, (endFileErr, endFileRes) =>
                    endorsePartialCallback endFileErr, endFileRes
            benchmarkFileFunc = (benchmarkPartialCallback) =>
                @addFileToRepo devCode, oldFileNames[0], 'consultation/', 'benchmark', "Added benchmark file for #{devCode}", true, (bmFileErr, bmFileRes) =>
                    benchmarkPartialCallback bmFileErr, bmFileRes
            theFileFuncs.push endorseFileFunc
            theFileFuncs.push benchmarkFileFunc
            async.series theFileFuncs, (consRecordFileError, consRecordFileRes) =>
                callback consRecordFileError, consRecordFileRes


        addFileToRepo: (devCode, oldFile, destFolder, context, commitMsg, withDate, callback) ->
            console.log "inside _addFileToRepo ... oldFile = #{oldFile}"
            oldFileComp = oldFile.filename.split " "
            oldFileName = oldFileComp.join('')
            console.log "oldFileName = #{oldFileName}"
            fileName = undefined
            if withDate
                now = moment()
                fileName = "#{devCode}-#{context}-#{now.format("YYYY-MM-DD:HH-mm")}#{path.extname(oldFileName)}"
            else
                fileName = "#{devCode}-#{context}#{path.extname(oldFileName)}"
            console.log "fileName =  #{fileName}"
            newDest = "#{destFolder}#{fileName}"
            console.log "newDest is #{newDest} and oldFileName = #{oldFileName}"
            fs.move "#{process.env.MULTER_UPLOAD_DIR}/#{oldFileName}", "#{process.env.FILE_STORAGE_DIR}/#{newDest}", (moveError) =>
                if moveError?
                    console.log "error moving the file ..."
                    callback moveError, null
                else
                    git(@repositoryName).add(newDest).commit commitMsg, (commitError, commitResult) =>
                        if commitError?
                            console.log "error committing file..."
                            callback commitError, null
                        else
                            git(@repositoryName).log [], (logError, logData) =>
                                if logError?
                                    console.log "log error ..."
                                    callback logError, null
                                else
                                    commitHash = logData.latest.hash
                                    console.log commitHash
                                    callback null, commitHash

        constructor: ->
            @repositoryName = "#{process.env.FILE_STORAGE_DIR}"
