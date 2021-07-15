'use strict'

# load internal libraries
SchemaValidator = require('./schema').SchemaValidator

exports.NeedAnalysisValidator = class NeedAnalysisValidator extends SchemaValidator

    checkAndSanitizeInitiator: (initiatorUsername, callback) ->
        @helper.checkAndSanitizeWord initiatorUsername, 'Need Analysis Initiator', @validator, (initiatorError, validInitiator) =>
            callback initiatorError, validInitiator

    checkAndSanitizeFaculty: (facultyCode, callback) ->
        @helper.checkAndSanitizeWords facultyCode, 'Faculty Code', @validator, (facultyCodeError, validFacultyCode) =>
            callback facultyCodeError, validFacultyCode

    checkAndSanitizeDepartment: (departmentCode, callback) ->
        @helper.checkAndSanitizeWords departmentCode, 'Department Code', @validator, (departmentCodeError, validDepartmentCode) =>
            callback departmentCodeError, validDepartmentCode

    checkAndSanitizeDevCode: (devCode, callback) ->
        @helper.checkAndSanitizeCode devCode, 'Programme Development Code', @validator, (devCodeError, validDevCode) =>
            callback devCodeError, validDevCode

    checkAndSanitizeProgrammeName: (progName, callback) ->
        @helper.checkAndSanitizeWords progName, 'Programme Name', @validator, (progNameError, validProgName) =>
            callback progNameError, validProgName

    checkAndSanitizeLevel: (level, callback) ->
        @helper.checkAndSanitizeNumber level, 'Programme Level', @validator, (levelError, validLevel) =>
            callback levelError, validLevel

    checkAndSanitizeConsultationDate: (consultationDate, callback) ->
        @helper.checkAndSanitizeDate consultationDate, 'Consultation Date', @validator, (consultationDateError, validConsultationDate) =>
            callback consultationDateError, validConsultationDate

    checkAndSanitizeOrganizationName: (organizationName, callback) ->
        @helper.checkAndSanitizeWords organizationName, 'Organization Name', @validator, (orgNameError, validOrgName) =>
            callback orgNameError, validOrgName

    checkAndSanitizeStatus: (statusValue, possibleValues, token, callback) ->
        @helper.checkAndSanitizePossibleValues statusValue, possibleValues, token, @validator, (statusError, validStatus) =>
            callback statusError, validStatus

    checkAndSanitizeDecision: (decision, callback) ->
        @helper.checkAndSanitizePossibleValues decision, ['approve', 'decline', 'defer'], 'PDU Decision', @validator, (decisionError, validDecision) =>
            callback decisionError, validDecision

    checkAndSanitizeBosAmendmentStatus: (bosStatus, callback) ->
        @helper.checkAndSanitizeBoolean bosStatus, 'BOS Amendment Status', @validator, (statusError, validStatus) =>
            if statusError?
                callback statusError, null
            else if validStatus is "true"
                callback null, true
            else
                callback null, false

    checkAndSanitizeDecisionMaker: (decisionMakerValue, callback) ->
        @helper.checkAndSanitizePossibleValues decisionMakerValue, ['senate', 'apc'], 'Senate Decision Maker', @validator, (decisionMakerError, validDEcisionMaker) =>
            callback decisionMakerError, validDEcisionMaker

    checkAndSanitizeSenateAmendmentStatus: (statusValue, decisionContext, callback) ->
        possibleValues = undefined
        token = undefined
        if decisionContext is 'senate'
            possibleValues = ['approve', 'decline', 'defer']
            token = 'Senate Amendment Status'
        else
            possibleValues = ['approve', 'decline']
            token = 'SENEX Amendment Status'
        @checkAndSanitizeStatus statusValue, possibleValues, token, (statusError, validStatus) =>
            callback statusError, validStatus

    checkAndSanitizeForInitialization: (initData, callback) ->
        console.log "inside checkAndSanitizeForInitialization..."
        console.dir initData
        initOptions =
            initiator: (initiatorPartialCallback) =>
                @checkAndSanitizeInitiator initData.initiator, (initiatorError, validInitiator) =>
                    initiatorPartialCallback initiatorError, validInitiator
            faculty: (facultyPartialCallback) =>
                @checkAndSanitizeFaculty initData.faculty, (facultyCodeError, validFacultyCode) =>
                    facultyPartialCallback facultyCodeError, validFacultyCode
            department: (departmentPartialCallback) =>
                @checkAndSanitizeDepartment initData.department, (departmentCodeError, validDepartmentCode) =>
                    departmentPartialCallback departmentCodeError, validDepartmentCode
            devCode: (devCodePartialCallback) =>
                @checkAndSanitizeDevCode initData.devCode, (devCodeError, validDevCode) =>
                    devCodePartialCallback devCodeError, validDevCode
            name: (progNamePartialCallback)=>
                @checkAndSanitizeProgrammeName initData.name, (nameError, validName) =>
                    progNamePartialCallback nameError, validName
            level: (levelPartialCallback) =>
                @checkAndSanitizeLevel initData.level, (levelError, validLevel) =>
                    levelPartialCallback levelError, validLevel
        @flowController.parallel initOptions, (initValidationError, validInitData) =>
            callback initValidationError, validInitData

    checkAndSanitizeForConsultation: (consultationData, callback) ->
        consultationOptions =
            date: (datePartialCallback) =>
                @checkAndSanitizeConsultationDate consultationData.date, (consultationDateError, validConsultationDate) =>
                    datePartialCallback consultationDateError, validConsultationDate
            organization: (organizationPartialCallback) =>
                @checkAndSanitizeOrganizationName consultationData.organization, (organizationNameError, validOrganizationName) =>
                    organizationPartialCallback organizationNameError, validOrganizationName
            devCode: (devCodePartialCallback) =>
                @checkAndSanitizeDevCode consultationData.devCode, (devCodeError, validDevCode) =>
                    devCodePartialCallback devCodeError, validDevCode
        @flowController.parallel consultationOptions, (consultationValidationError, validConsultationData) =>
            callback consultationValidationError, validConsultationData

    checkAndSanitizeForConclusion: (conclusionData, callback) ->
        conclusionOptons =
            devCode: (devCodePartialCallback) =>
                @checkAndSanitizeDevCode conclusionData.devCode, (devCodeError, validDevCode) =>
                    devCodePartialCallback devCodeError, validDevCode
            decision: (decisionPartialCallback) =>
                @checkAndSanitizeDecision conclusionData.decission, (decisionError, validDecision) =>
                    decisionPartialCallback decisionError, validDecision
        @flowController.parallel conclusionOptons, (conclusionError, validConclusionData) =>
            callback conclusionError, validConclusionData

    checkAndSanitizeForSurvey: (surveyData, callback) ->
        @checkAndSanitizeDevCode surveyData.devCode, (devCodeError, validDevCode) =>
            callback devCodeError, validDevCode

    checkAndSanitizeForBOSStartup: (bosStartupData, callback) ->
        console.log "inside sanitizer for bos startup"
        console.dir bosStartupData
        bosStartupOptions =
            devCode: (devCodePartialCallback) =>
                @checkAndSanitizeDevCode bosStartupData.devCode, (devCodeError, validDevCode) =>
                    devCodePartialCallback devCodeError, validDevCode
            date: (datePartialCallback) =>
                @helper.checkAndSanitizeDate bosStartupData.date, 'BOS phase startup Date', @validator, (activityDateError, validActivityDate) =>
                    datePartialCallback activityDateError, validActivityDate
        @flowController.parallel bosStartupOptions, (bosStartupDataError, validBosStartupData) =>
            callback bosStartupDataError, validBosStartupData

    checkAndSanitizeForSenateStartup: (senateStartupData, callback) ->
        console.log "inside sanitizer for senate startup"
        console.dir senateStartupData
        senStartupOptions =
            devCode: (devCodePartialCallback) =>
                @checkAndSanitizeDevCode senateStartupData.devCode, (devCodeError, validDevCode) =>
                    devCodePartialCallback devCodeError, validDevCode
            date: (datePartialCallback) =>
                @helper.checkAndSanitizeDate senateStartupData.date, 'Senate Phase startup Date', @validator, (activityDateError, validActivityDate) =>
                    datePartialCallback activityDateError, validActivityDate
        @flowController.parallel senStartupOptions, (senateStartupDataError, validSenateStartupData) =>
            callback senateStartupDataError, validSenateStartupData

    checkAndSanitizeForBOSAmendments: (bosAmendmentData, callback) ->
        amendmentOptions =
            devCode: (devCodePartialCallback) =>
                @checkAndSanitizeDevCode bosAmendmentData.devCode, (devCodeError, validDevCode) =>
                    devCodePartialCallback devCodeError, validDevCode
            date: (datePartialCallback) =>
                @checkAndSanitizeConsultationDate bosAmendmentData.date, (amendmentDateError, validAmendmentDate) =>
                    datePartialCallback amendmentDateError, validAmendmentDate
            status: (statusPartialCallback) =>
                @checkAndSanitizeBosAmendmentStatus bosAmendmentData.status, (statusError, validStatus) =>
                    statusPartialCallback statusError, validStatus
        @flowController.parallel amendmentOptions, (amendmentValidationError, validAmendment) =>
            callback amendmentValidationError, validAmendment

    checkAndSanitizeForSenateAmendments: (senateAmendmentData, callback) ->
        amendmentOptions =
            devCode: (devCodePartialCallback) =>
                @checkAndSanitizeDevCode senateAmendmentData.devCode, (devCodeError, validDevCode) =>
                    devCodePartialCallback devCodeError, validDevCode
            date: (datePartialCallback) =>
                @checkAndSanitizeConsultationDate senateAmendmentData.date, (amendmentDateError, validAmendmentDate) =>
                    datePartialCallback amendmentDateError, validAmendmentDate
            status: (statusPartialCallback) =>
                @checkAndSanitizeSenateAmendmentStatus senateAmendmentData.status, senateAmendmentData.madeBy, (statusError, validStatus) =>
                    statusPartialCallback statusError, validStatus
            madeBy: (madeByPartialCallback) =>
                @checkAndSanitizeDecisionMaker senateAmendmentData.madeBy, (madeByError, validMadeBy) =>
                    madeByPartialCallback madeByError, validMadeBy
        @flowController.parallel amendmentOptions, (amendmentValidationError, validAmendment) =>
            callback amendmentValidationError, validAmendment

    constructor: ->
        super()
