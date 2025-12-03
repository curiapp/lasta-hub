'use strict'

AbstractController = require('./abstract').AbstractController

exports.BodiesController = class BodiesController extends AbstractController

    # the following is a short version of the controller
    addDraft: (draftData, handlerObject) ->
        @continueWithHandler null, handlerObject, null, "ok"

    submitToBOS: (bosSubmissionData, handlerObject) ->
        @continueWithHandler null, handlerObject, null, "ok"

    addFacultyRecommendation: (recommendationData, handlerObject) ->
        @continueWithHandler null, handlerObject, null, "ok"

    addOtherFacultyRecommendation: (recommendationData, handlerObject) ->
        @continueWithHandler null, handlerObject, null, "ok"

    startSenate: (startSenateData, handlerObject) ->
        @continueWithHandler null, handlerObject, null, "ok"

    addAPCRecommendation: (recommendationData, handlerObject) ->
        @continueWithHandler null, handlerObject, null, "ok"

    recordSenateFinalRecommendation: (recommendationData, handlerObject) ->
        @continueWithHandler null, handlerObject, null, "ok"

    constructor: ->
        super()
