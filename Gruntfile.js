'use strict';
// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to match all subfolders:
// 'test/spec/**/*.js'
module.exports = function(grunt) {
    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        connect: {
            options: {
                port: 80,
                // change this to '0.0.0.0' to access the server from outside
                hostname: 'localhost'                
            },
            server: {
                options: {
                    middleware: function(connect, options) {
                        return [
                            require('connect-livereload')(),
                            // Serve static files.
                            connect.static(options.base)
                        ];
                    }
                }
            }
        },
        open: {
            server: {
                path: 'http://localhost:<%= connect.options.port %>'
            }
        },
        watch: {
            options: {
                livereload: true
            },
            server:{
                files: ['demo/**', 'com/{,*/}*.js']
            }
        }
    });

    grunt.registerTask('default', ['connect:server', 'open:server', 'watch']);
};