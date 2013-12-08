module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt, ['grunt-*']);
    
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        watch: {
//            files: ['./app/styles/sass/*.scss', './app/styles/sass/*/*.scss', 'app/*.html'],
            files: ['./app/styles/sass/**/*.scss', 'app/*.html'],
//            files: ['<% sass.dev.src %>'],
            tasks: ['sass:dev']
        },
        
        sass: { 
            dist: {
                options: {
//                    style: 'compressed',
                },
                expand: true,
                cwd: './app/styles/sass/',
                src: ['*.scss'],
                dest: './dist/styles/',
                ext: '.css'
            },
            dev: {
                options: {
                    style: 'expanded',
                    debugInfo: false,
                    lineNumbers: false,
                },
                expand: true,
                cwd: './app/styles/sass/',
                src: ['*.scss'],
                dest: './app/styles/',
                ext: '.css'
            }
        },
        
        browser_sync: {
            files: {
                src : ['./app/styles/style.css', './app/*.html'],
            },
            options: {
                watchTask: true,
                server: {
                    baseDir: "app"
                },
                ghostMode: {
                    scroll: true,
                    links: true,
                    forms: true
                }
            },
        },
        
        clean: {
            dist: {
                src: ["./dist/"]
            }
        },
        
        uglify: {
            options: {
                mangle: false,
                report: 'min',
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            dist: {
                files: {
                    './dist/js/modernizr.min.js': ['./app/js/modernizr.js'],
                    './dist/js/app.min.js': ['./app/js/jquery.js', './app/js/ajaxchimp.js', './app/js/functions.js']
                }
            }
        },
        
        processhtml: {
            options: {
                data: {
                    title: 'My title'
                }
            },
            dist: {
                files: {
                    './dist/index.html': ['./app/index.html']
                }
            },
        },
        
        autoprefixer: {
            options: {

            },
            dist: {
                src: 'dist/styles/style.css',
                dest: 'dist/styles/style.css'
            },
        },
        
        uncss: {
            dist: {
                files: {
                    'dist/styles/style.css': ['./dist/index.html']
                },
                options: {
                    compress:true,
                    ignore: [
                        '.mailchimp__form--error--active', // functions.js
                        '.ajc--error', // ajaxchimp.js
                        '.ajc--valid' // ajaxchimp.js
                        ]
                }
            }
        },
        
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true,
                    removeEmptyAttributes: true,
                    removeCommentsFromCDATA: true,
                    removeRedundantAttributes: true,
                    collapseBooleanAttributes: true
                },
                files: {
                    './dist/index.html': './dist/index.html'
                }
            }
        }
        
    });
    grunt.registerTask('default', ['browser_sync', 'watch']);
    
//    grunt.registerTask('dist', ['sass:dist', 'uncss']);
    grunt.registerTask('dist', ['clean:dist', 'processhtml:dist', 'sass:dist', 'uglify:dist', 'uncss:dist', 'htmlmin']);
};