'use strict'

ConsultationRequestHandler = require('../route-handlers/consultation').ConsultationRequestHandler

module.exports = (app, uploader) ->

    # start consultations
    app.route('/api/consultations/pac/start').post uploader.single('pac-start'), (request, response) ->
        console.log "new POST request /api/consultations/pac/start ..."
        ConsultationRequestHandler.getInstance().startPACConsultations request, response

    # benchmark consultations
    app.route('/api/consultations/benchmark').post uploader.single('benchmark'), (request, response) ->
        console.log "new POST request /api/consultations/benchmark ..."
        ConsultationRequestHandler.getInstance().addBenchmark request, response

    # add final draft
    app.route('/api/consultations/pac/final-draft').post uploader.single('final-draft'), (request, response) ->
        console.log "new POST request /api/consultations/pac/final-draft ..."
        ConsultationRequestHandler.getInstance().addFinalDraft request, response

    # draft endorsement
    app.route('/api/consultations/pac/endorse').post uploader.single('recommendation'), (request, response) ->
        console.log "new POST request /api/consultations/pac/endorse ..."
        ConsultationRequestHandler.getInstance().endorse request, response

    # merged consultations
    endorseDocField =
        name: 'endorsements'
        maxCount: 1
    benchmkDocField =
        name: 'benchmarking'
        maxCount: 1
    consultCol = [endorseDocField, benchmkDocField]
    consultUploads = uploader.fields consultCol
    app.route('/api/consultations/pac/consult').post consultUploads, (request, response) ->
        console.log("new POST request to /api/consultations/pac/consult ...")
        ConsultationRequestHandler.getInstance().recordConsultations request, response
