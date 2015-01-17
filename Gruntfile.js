module.exports = function(grunt) { 
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        CLIENT_DIR: 'app/client',
        uglify: {
            options: {
                banner: '/ *GottaDo - <%= grunt.template.today("mm-dd-yyyy") %> - ☮ & ♥ */\n'
            },
            compile: {
                files: {
                    'public/js/app.min.js': ['<%= browserify.compile.dest %>']
                }
            }
        },
        browserify: {
            compile: {
                src: ['<%= CLIENT_DIR %>/app.js'],
                dest: 'public/js/app.js'
            }
        },
        jade: {
            compile: {
                src: ['<%= CLIENT_DIR %>/*.jade'],
                dest: 'public/index.html'
            }
        },
        stylus: {
            compile: {
                options: {
                    compress: true
                },
                src: ['<%= CLIENT_DIR %>/app.styl'],
                dest: 'public/css/app.min.css'
            }
        },
        nodemon: {
            dev: {
                script: 'server.js'
            }
        },
        watch: {
            browserify: {
                files: ['<%= CLIENT_DIR %>/**/*.js','<%= CLIENT_DIR %>/app.js'],
                tasks: ['browserify:compile','uglify:compile']
            },
            stylus: {
                files: ['<%= CLIENT_DIR %>/**/*.styl','<%= CLIENT_DIR %>/app.styl'],
                tasks: ['stylus:compile']
            },
            jade: {
                files: ['<%= CLIENT_DIR %>/**/*.jade','<%= CLIENT_DIR %>/*.jade'],
                tasks: ['jade:compile']
            },
            src: {
                files: ['app/model/*.js']
            }
        },
        concurrent: {
            tasks: ['watch','nodemon'],
            options: {
                logConcurrentOutput: true
            }
        },        
        shell: {
            reset: {
                command: 'node app/data/init'
            }
        }
    })
    
    grunt.loadNpmTasks('grunt-browserify')
    grunt.loadNpmTasks('grunt-contrib-uglify')
    grunt.loadNpmTasks('grunt-contrib-jade')
    grunt.loadNpmTasks('grunt-contrib-watch')
    grunt.loadNpmTasks('grunt-contrib-stylus')
    grunt.loadNpmTasks('grunt-nodemon')
    grunt.loadNpmTasks('grunt-concurrent')
    grunt.loadNpmTasks('grunt-shell')
    grunt.registerTask('reset', ['shell:reset'])
    grunt.registerTask('prototype', ['jade:prototype','stylus:prototype','watch:prototype','concurrent'])
    grunt.registerTask('compile', ['jade:compile','stylus:compile','browserify:compile','uglify:compile'])
    grunt.registerTask('default', ['compile','concurrent'])
}