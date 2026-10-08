'use strict'

QualificationRequestHandler = require('../route-handlers/qualification').QualificationRequestHandler

module.exports = (app, uploader) ->
    # nqa preparation
    qualDocField =
        name: 'qualification-doc'
        maxCount: 1
    supportField =
        name: 'support-file'
        maxCount: 1
    preparationCol = [qualDocField, supportField]
    preparationUploads = uploader.fields preparationCol
    # preparationUploads = uploader.array('nqa-pre', 2)
    # app.route('/api/nqa/preparation').post uploader.array('nqa-pre'), (request, response) ->
    app.route('/api/nqa/preparation').post preparationUploads, (request, response) ->
        console.log "just received a POST request to /api/nqa/preparation ..."
        QualificationRequestHandler.getInstance().prepare request, response

    # pdu recommend
    app.route('/api/nqa/pdu-recommend').post uploader.single('pdu-recommendation'), (request, response) ->
        console.log "just received a POST request to /api/nqa/pdu-recommend ..."
        QualificationRequestHandler.getInstance().addPDURecommendation request, response

    # nqa recommendation
    app.route('/api/nqa/recommend').post uploader.single('nqa-recommendation'), (request, response) ->
        console.log "just received a POST request to /api/nqa/recommend ..."
        QualificationRequestHandler.getInstance().addRecommendation request, response

    # nqa registration
    app.route('/api/nqa/register').post uploader.single('course-document'), (request, response) ->
        console.log "just received a POST request to /api/nqa/register ..."
        QualificationRequestHandler.getInstance().register request, response

    # nqa response submission
    draftDocField =
        name: 'qualification-doc'
        maxCount: 1
    respDocField =
        name: 'response'
        maxCount: 1
    submitCol = [draftDocField, respDocField]
    submitUploads = uploader.fields submitCol
    app.route('/api/nqa/submit').post submitUploads, (request, response) ->
        console.log "just received a POST request to /api/nqa/submit ..."
        QualificationRequestHandler.getInstance().submit request, response
