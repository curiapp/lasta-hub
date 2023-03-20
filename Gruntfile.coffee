'use strict'
module.exports = (grunt) ->
    configOptions =
        pkg:
            grunt.file.readJSON 'package.json'
        copy:
            main:
                expand: true
                cwd: 'src/'
                src: '**'
                dest: 'dist'
        sshconfig:
            khost:
                host: '196.216.167.190'
                username: 'lasta'
                port: 6547
                agent: process.env.SSH_AUTH_SOCK
            niort:
                host: '172.28.253.76'
                username: 'curi'
                agent: process.env.SSH_AUTH_SOCK
        sshexec:
            deploytest:
                command: ['cd pds', 'git pull origin master', 'npm install', 'bower install', 'cd dist/client/public/angular2', 'npm install', 'cd', 'export NODE_ENV=production; pm2 restart all'].join(' && ')
                options:
                    config: 'khost'
            deployprod:
                command: ['cd darfur', 'git pull origin master', 'npm install', 'cd test-single-machine/local-app', 'npm install', 'cd', 'export NODE_ENV=production; pm2 restart all'].join(' && ')
                options:
                    config: 'niort'
    grunt.initConfig configOptions

    grunt.loadNpmTasks 'grunt-ssh'
    grunt.loadNpmTasks 'grunt-contrib-copy'

    grunt.registerTask 'deploy1', ['sshexec:deploytest']
    grunt.registerTask 'deploy2', ['sshexec:deployprod']
    grunt.registerTask 'release', ['copy']
