'use strict'

# load internal libraries
SchemaValidator = require('./schema').SchemaValidator

exports.CurriculumDevelopmentValidator = class CurriculumDevelopmentValidator extends SchemaValidator

    checkAndSanitizeInitiator: (initiatorUsername, callback) ->
        @helper.checkAndSanitizeWord initiatorUsername, 'Curriculum Review Initiator', @validator, (initiatorError, validInitiator) =>
            callback initiatorError, validInitiator

    checkAndSanitizeForReview: (reviewData, callback) ->
        reviewOptions =
            devCode: (devCodePartialCallback) =>
                @helper.checkAndSanitizeCode reviewData.devCode, 'Programme Development Code', (devCodeError, validDevCode) =>
                    devCodePartialCallback devCodeError, validDevCode
            code: (codePartialCallback) =>
                @helper.checkAndSanitizeCode reviewData.code, 'Programme Code', (codeError, validCode) =>
                    devCodePartialCallback codeError, validCode
            initiator: (initiatorPartialCallback) =>
                @checkAndSanitizeInitiator initData.initiator, (initiatorError, validInitiator) =>
                    initiatorPartialCallback initiatorError, validInitiator
        @flowController.parallel reviewOptions, (reviewValidationError, validReviewData) =>
            callback reviewValidationError, validReviewData

    checkAndSanitizeCurriculumDevelopmentData: (curDev, callback) ->
        curDevOptions =
            devCode: (devCodePartialCallback) =>
                @helper.checkAndSanitizeCode curDev.devCode, 'Programme Development Code', (devCodeError, validDevCode) =>
                    devCodePartialCallback devCodeError, validDevCode
            date: (datePartialCallback) =>
                @helper.checkAndSanitizeDate curDev.date, 'Curriculum Development Activity Date', @validator, (activityDateError, validActivityDate) =>
                    datePartialCallback activityDateError, validActivityDate
        @flowController.parallel curDevOptions, (curDevDataError, validCurDevData) =>
            callback curDevDataError, validCurDevData

    checkAndSanitizeCommitteeMemberData: (isPac, cmtMemberData, memberAttr, token,  callback) ->
        memberOptions =
            devCode: (devCodePartialCallback) =>
                @helper.checkAndSanitizeCode cmtMemberData.devCode, 'Programme Development Code', @validator, (devCodeError, validDevCode) =>
                    devCodePartialCallback devCodeError, validDevCode
            members: (memberPartialCallback) =>
                @checkAndSanitizeMemberCol isPac, cmtMemberData[memberAttr], token, (memberColError, validMemberCol) =>
                    memberPartialCallback memberColError, validMemberCol
        @flowController.parallel memberOptions, (memberCmtDataError, validMemberData) =>
            callback memberCmtDataError, validMemberData

    checkAndSanitizeMemberCol: (isPac, memberCol, token, callback) ->
        memberFuncs = memberCol.map (memberItem) =>
            currentMemberFunc = (partialMemberCallback) =>
                @checkAndSanitizeSingleCommitteeMember isPac, memberItem, token, (singleMemberError, validSingleMember) =>
                    partialMemberCallback singleMemberError, validSingleMember
            return currentMemberFunc
        @flowController.parallel memberFuncs, (membersError, validMembers) =>
            callback membersError, validMembers

    checkAndSanitizeSingleCommitteeMember: (isPac, member, token, callback) ->
        orgVal = if member.organisation? then member.organisation else "NUST"
        committeeMemberOptions =
            firstName: (firstNamePartialCallback) =>
                @checkAndSanitizeName member.firstName, "Member First Name", (firstNameError, validFirstName) =>
                    firstNamePartialCallback firstNameError, validFirstName
            lastName: (lastNamePartialCallback) =>
                @checkAndSanitizeName member.lastName, "Member Last Name", (lastNameError, validLastName) =>
                    lastNamePartialCallback lastNameError, validLastName
            emailAddress: (emailAddressPartialCallback) =>
                @helper.checkAndSanitizeEmailAddress member.emailAddress, 'Member Email Address', @validator, (emailAddressError, validEmailAddress) =>
                    emailAddressPartialCallback emailAddressError, validEmailAddress
            qualification:  (qualificationPartialCallback) =>
                @checkAndSanitizeQualification member.qualification, "Member Qualification", (qualificationError, validQualification) =>
                    qualificationPartialCallback qualificationError, validQualification
            cellphone: (cellphonePartialCallback) =>
                cellphonePartialCallback null, member.cellphone
            workNumber: (workNumberPartialCallback) =>
                workNumberPartialCallback null, member.workNumber
        if isPac
            committeeMemberOptions["occupation"] = (occupationPartialCallback) =>
                @helper.checkAndSanitizeWords member.occupation, 'Member Occupation', @validator, (occupationError, validOccupation) =>
                    occupationPartialCallback occupationError, validOccupation
            committeeMemberOptions["organization"] = (organizationPartialCallback) =>
                @helper.checkAndSanitizeWords member.organization, 'Member Organization', @validator, (organizationError, validOrganization) =>
                    organizationPartialCallback organizationError, validOrganization
        @flowController.parallel committeeMemberOptions, (committeeMemberError, validCommitteeMember) =>
            callback committeeMemberError, validCommitteeMember

    checkAndSanitizeName: (name, token, callback) ->
        @helper.checkAndSanitizeName name, token, @validator, (nameError, validName) =>
            callback nameError, validName

    checkAndSanitizeQualification: (qualif, token, callback) ->
        @helper.checkAndSanitizeWords qualif, token, @validator, (qualifError, validQualif) =>
            callback qualifError, validQualif

    checkAndSanitizeForBOSSubmission: (submissionData, callback) ->
        @checkAndSanitizeCurriculumDevelopmentData submissionData, (bosSubmissionDataError, validBosSubmissionData) =>
            callback bosSubmissionDataError, validBosSubmissionData

    checkAndSanitizeForBOSAmendment: (amendmentData, callback) ->
        @checkAndSanitizeCurriculumDevelopmentData amendmentData, (bosAmendmentDataError, validBosAmendmentData) =>
            callback bosAmendmentDataError, validBosAmendmentData

    checkAndSanitizeForBOSAuthorization: (bosAuthorizationData, callback) ->
        @checkAndSanitizeCurriculumDevelopmentData bosAuthorizationData, (bosAuthorizationDataError, validBosAuthorizationData) =>
            callback bosAmendmentDataError, validBosAuthorizationData

    checkAndSanitizeForSenateSubmission: (senateSubmissionData, callback) ->
        @checkAndSanitizeCurriculumDevelopmentData senateSubmissionData, (senateSubmissionDataError, validSenateSubmissionData) =>
            callback senateSubmissionDataError, validSenateSubmissionData

    checkAndSanitizeForSenateAmendment: (senateAmendmentData, callback) ->
        @checkAndSanitizeCurriculumDevelopmentData senateAmendmentData, (senateAmendmentDataError, validSenateAmendmentData) =>
            callback senateAmendmentDataError, validSenateAmendmentData

    checkAndSanitizeForSenateAuthorization: (senateAuthorizationData, callback) ->
        @checkAndSanitizeCurriculumDevelopmentData senateAuthorizationData, (senateAuthorizationDataError, validSenateAuthorizationData) =>
            callback senateAuthorizationDataError, validSenateAuthorizationData

    checkAndSanitizeForCDCAppointment: (cdcMemberData, callback) ->
        @checkAndSanitizeCommitteeMemberData false, cdcMemberData, 'cdc', 'CDC Member', (cdcDataError, validCDCData) =>
            callback cdcDataError, validCDCData

    checkAndSanitizeForPACAppointment: (pacMemberData, callback) ->
        @checkAndSanitizeCommitteeMemberData true, pacMemberData, 'pac', 'PAC Member', (pacDataError, validPACData) =>
            callback pacDataError, validPACData

    checkAndSanitizeForDraftMgmt: (draftData, callback) ->
        draftOptions =
            devCode: (devCodePartialCallback) =>
                @helper.checkAndSanitizeCode draftData.devCode, 'Programme Development Code', (devCodeError, validDevCode) =>
                    devCodePartialCallback devCodeError, validDevCode
            user: (userPartialCallback) =>
                @helper.checkAndSanitizeWord draftData.user, 'User', @validator, (userError, validUser) =>
                    userPartialCallback userError, validUser
        @flowControl.parallel draftOptions, (draftDataError, validDraftData) =>
            callback draftDataError, validDraftData

    checkAndSanitizeForDraftSubmission: (draftSubmissionData, callback) ->
        draftSubmitOptions =
            devCode:  (devCodePartialCallback) =>
                @helper.checkAndSanitizeCode draftSubmissionData.devCode, 'Programme Development Code', @validator, (devCodeError, validDevCode) =>
                    devCodePartialCallback devCodeError, validDevCode
            submissionDate: (submissionDatePartialCallback) =>
                @helper.checkAndSanitizeDate draftSubmissionData.date, 'Curriculum Development Activity Date', @validator, (activityDateError, validActivityDate) =>
                    submissionDatePartialCallback activityDateError, validActivityDate
        @flowController.parallel draftSubmitOptions, (draftSubmissionDataError, validDraftSubmissionData) =>
            callback draftSubmissionDataError, validDraftSubmissionData

    checkAndSanitizeForDraftRevision: (draftRevisionData, callback) ->
        draftReviseOptions =
            devCode:  (devCodePartialCallback) =>
                @helper.checkAndSanitizeCode draftRevisionData.devCode, 'Programme Development Code', @validator, (devCodeError, validDevCode) =>
                    devCodePartialCallback devCodeError, validDevCode
        @flowController.parallel draftReviseOptions, (draftRevisionDataError, validDraftRevisionData) =>
            callback draftRevisionDataError, validDraftRevisionData

    checkAndSanitizeForDraftValidation: (draftValidationData, callback) ->
        draftValidationOptions =
            devCode:  (devCodePartialCallback) =>
                @helper.checkAndSanitizeCode draftValidationData.devCode, 'Programme Development Code', @validator, (devCodeError, validDevCode) =>
                    devCodePartialCallback devCodeError, validDevCode
            decision: (decisionPartialCallback) =>
                @helper.checkAndSanitizePossibleValues draftValidationData.decision, ['approve', 'decline'], 'Curriculum Draft Validation', @validator, (decisionError, validDecision) =>
                    decisionPartialCallback decisionError, validDecision
        @flowController.parallel draftValidationOptions, (draftValidationDataError, validDraftValidationData) =>
            callback draftValidationDataError, validDraftValidationData

    checkAndSanitizeForCollSubmission: (collDocData, callback) ->
        collDocValidationOptions =
            devCode:  (devCodePartialCallback) =>
                @helper.checkAndSanitizeCode collDocData.devCode, 'Programme Development Code', @validator, (devCodeError, validDevCode) =>
                    devCodePartialCallback devCodeError, validDevCode
        @flowController.parallel collDocValidationOptions, (collDocValidationDataError, validCollDoc) =>
            callback collDocValidationDataError, validCollDoc

    constructor: ->
        super()
