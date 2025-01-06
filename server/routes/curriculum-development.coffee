'use strict'

CurriculumDevelopmentRequestHandler = require('../route-handlers/curriculum-development').CurriculumDevelopmentRequestHandler

module.exports = (app, uploader) ->
	# pac appointment
	app.route('/api/curriculum-development/appoint/pac').post (request, response) ->
		console.log "new POST request to /api/curriculum-development/appoint/pac ..."
		CurriculumDevelopmentRequestHandler.getInstance().appointPACMembers request, response

	# draft revision
	app.route('/api/curriculum-development/draft/revise').post uploader.single('survey'), (request, response) ->
		console.log "new POST request to /api/curriculum-development/draft/revise ..."
		CurriculumDevelopmentRequestHandler.getInstance().reviseDraft request, response

	# draft submission
	app.route('/api/curriculum-development/draft/submit').post (request, response) ->
		console.log "new POST request to /api/curriculum-development/draft/submit ..."
		CurriculumDevelopmentRequestHandler.getInstance().submitDraft request, response

	# draft validation
	app.route('/api/curriculum-development/draft/validate').post uploader.single('check-list'), (request, response) ->
		console.log "new POST request to /api/curriculum-development/draft/validate ..."
		CurriculumDevelopmentRequestHandler.getInstance().validateDraft request, response

	app.route('/api/curriculum-development/bos/submit').post (request, response) ->
		console.log "new POST request to /api/curriculum-development/bos/submit ..."
		CurriculumDevelopmentRequestHandler.getInstance().submitToBos request, response

	app.route('/api/curriculum-development/bos/amend').post (request, response) ->
		console.log "new POST request to /api/curriculum-development/bos/amend ..."
		CurriculumDevelopmentRequestHandler.getInstance().documentBosAmendment request, response

	app.route('/api/curriculum-development/bos/authorize').post (request, response) ->
		console.log "new POST request to /api/curriculum-development/bos/authorize ..."
		CurriculumDevelopmentRequestHandler.getInstance().recordAuthorizationFromBos request, response

	app.route('/api/curriculum-development/senate/submit').post (request, response) ->
		console.log "new POST request to /api/curriculum-development/senate/submit ..."
		CurriculumDevelopmentRequestHandler.getInstance().submitToSenate request, response

	app.route('/api/curriculum-development/senate/amend').post (request, response) ->
		console.log "new POST request to /api/curriculum-development/senate/amend ..."
		CurriculumDevelopmentRequestHandler.getInstance().documentSenateAmendment request, response

	app.route('/api/curriculum-development/senate/authorize').post (request, response) ->
		console.log "new POST request to /api/curriculum-development/senate/authorize ..."
		CurriculumDevelopmentRequestHandler.getInstance().recordAuthorizationFromSenate request, response

	app.route('/api/curriculum-development/appoint/cdc').post (request, response) ->
		console.log "new POST request to /api/curriculum-development/appoint/cdc ..."
		CurriculumDevelopmentRequestHandler.getInstance().appointCDCMembers request, response

	app.route('/api/curriculum-development/coll/submit').post (request, response) ->
		console.log "new POST request to /api/curriculum-development/coll/submit ..."
		CurriculumDevelopmentRequestHandler.getInstance().submitToColl request, response

	app.route('/api/curriculum-development/review').post (request, response) ->
		console.log "new POST request to /api/curriculum-development/review ..."
		CurriculumDevelopmentRequestHandler.getInstance().review request, response
