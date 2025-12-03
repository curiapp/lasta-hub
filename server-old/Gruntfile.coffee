'use strict'

module.exports = (grunt) ->
    configOptions =
        pkg:
            grunt.file.readJSON 'package.json'
        copy:
            main:
                expand: true
                cwd: 'src/'
                src: '../client/**'
                dest: 'dist'
        sshconfig:
            khost:
                host: '196.216.167.190'
                username: 'lasta'
                port: 6547
                agent: process.env.SSH_AUTH_SOCK
            niort:
                host: '127.0.0.1'
                username: 'curi'
                agent: process.env.SSH_AUTH_SOCK
        sshexec:
            deploytest:
                command: [
                    'cd pds',
                    'git pull origin master',
                    'npm install',
                    'bower install',
                    'cd dist/client/public/angular2',
                    'npm install',
                    'cd',
                    'export NODE_ENV=production; pm2 restart all'
                ].join(' && ')
                options:
                    config: 'khost'
            deployprod:
                command: [
                    'cd darfur',
                    'git pull origin master',
                    'npm install',
                    'cd local-app',
                    'npm install',
                    'cd',
                    'export NODE_ENV=production; pm2 restart all'
                ].join(' && ')
                options:
                    config: 'niort'
        shell:
            deploylocal:
                command: [
                    'yarn install',
                    'cd dist',
                    'yarn install',
                    'export NODE_ENV=development; pm2 restart all'
                ].join(' && ')
    grunt.initConfig configOptions

    # Load required tasks
    grunt.loadNpmTasks 'grunt-ssh'
    grunt.loadNpmTasks 'grunt-contrib-copy'
    grunt.loadNpmTasks 'grunt-shell'

    # Define tasks
    grunt.registerTask 'deploy1', ['sshexec:deploytest']
    grunt.registerTask 'deploy2', ['sshexec:deployprod']
    grunt.registerTask 'deploylocal', ['copy']
    grunt.registerTask 'release', ['copy']
