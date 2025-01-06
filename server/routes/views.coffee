'use strict'

module.exports = (app) ->
    # Route to the single page
    app.route('/').get (request, response) ->
        console.log "new GET request to /"
        response.render 'index.html'
