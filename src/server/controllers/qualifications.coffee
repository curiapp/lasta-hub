'use strict'

AbstractController = require('./abstract').AbstractController

exports.QualificationsController = class QualificationsController extends AbstractController

    prepare: (preparationData, handlerObject) ->
        @continueWithHandler null, handlerObject, null, "ok"

    addPDURecommendation: (recommendationData, handlerObject) ->
        @continueWithHandler null, handlerObject, null, "ok"

    addRecommendation: (recommendationData, handlerObject) ->
        @continueWithHandler null, handlerObject, null, "ok"

    register: (registrationData, handlerObject) ->
        @continueWithHandler null, handlerObject, null, "ok"

    submit: (submissionData, handlerObject) ->
        @continueWithHandler null, handlerObject, null, "ok"

    constructor: ->
        super()
