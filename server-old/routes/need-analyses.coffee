'use strict'

NeedAnalysisRequestHandler = require('../route-handlers/need-analysis').NeedAnalysisRequestHandler

module.exports = (app, uploader) ->
    app.route('/api/need-analysis/start').post (request, response) ->
        console.log "new POST request to /api/need-analysis/start...."
        NeedAnalysisRequestHandler.getInstance().startNeedAnalysis request, response

    app.route('/api/need-analysis/consult').post uploader.single('consultation'), (request, response) ->
        console.log "new POST request to /api/need-analysis/consult ..."
        NeedAnalysisRequestHandler.getInstance().submitConsultationDetails request, response

    app.route('/api/need-analysis/survey').post uploader.single('survey'), (request, response) ->
        console.log "new POST request to /api/need-analysis/survey ..."
        NeedAnalysisRequestHandler.getInstance().submitSurvey request, response

    app.route('/api/need-analysis/conclude').post uploader.single('check-list'), (request, response) ->
        console.log "new POST request to /api/need-analysis/conclude ..."
        NeedAnalysisRequestHandler.getInstance().conclude request, response

    app.route('/api/need-analysis/bos/start').post (request, response) ->
        console.log "new POST request to /api/need-analysis/bos/start ..."
        NeedAnalysisRequestHandler.getInstance().startBOSPhase request, response

    app.route('/api/need-analysis/bos/recommend').post uploader.single('recommendation'), (request, response) ->
        console.log "new POST request to /api/need-analysis/bos/recommend ..."
        NeedAnalysisRequestHandler.getInstance().recordBOSRecommendations request, response

    app.route('/api/need-analysis/senate/start').post (request, response) ->
        console.log "new POST request to /api/need-analysis/senate/start ..."
        NeedAnalysisRequestHandler.getInstance().startSenatePhase request, response

    app.route('/api/need-analysis/senate/recommend').post  uploader.single('recommendation'), (request, response) ->
        console.log "new POST request to /api/need-analysis/senate/recommend ..."
        NeedAnalysisRequestHandler.getInstance().recordSenateRecommendations request, response

    app.route('/api/need-analysis/apc/recommend').post uploader.single('apc'), (request, response) ->
        console.log "new POST request to /api/need-analysis/apc/recomment ..."
        NeedAnalysisRequestHandler.getInstance().recordAPCRecommendations request, response
