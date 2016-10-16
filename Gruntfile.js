var iconvLite = require('iconv-lite');

module.exports = function (grunt) {
    grunt.initConfig({

        dir: {
            dev: 'dev',
            dist: 'dist',
            temp: 'temp'
        },
        concat: {
            basic_and_extras: {
                files: {
                    '<%= dir.dev %>/common/libs/assets.js':[
                        '<%= dir.dev %>/common/fla/*.js'
                    ],
                    '<%= dir.dev %>/common/libs.js':[
                        '<%= dir.dev %>/common/libs/jquery-1.11.3.js',
                        '<%= dir.dev %>/common/libs/jquery.inview.js',
                        '<%= dir.dev %>/common/libs/easeljs-0.8.1.min.js',
                        '<%= dir.dev %>/common/libs/tweenjs-0.6.1.min.js',
                        '<%= dir.dev %>/common/libs/movieclip-0.8.1.min.js',
                        '<%= dir.dev %>/common/libs/assets.js'
                    ]
                }
            }
        },
        //copy: {
        //    dist: {
        //        expand: true,
        //        cwd: '<%= dir.dev %>',
        //        src: [
        //            '**/*.{png,jpg,gif,svg}',
        //            '!**/**/*_src/*.{png,jpg,gif,svg}'
        //        ],
        //        dest: '<%= dir.dist %>'
        //    }
        //},
        uglify: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= dir.dev %>',
                    src: [
                        '**/*.js',
                        // libディレクトリ内のjsファイルはコンパイル無視
                        '!**/libs/*.js',
                        '!**/fla/*.js'
                    ],
                    dest: '<%= dir.dist %>',
                    ext: '.min.js'
                }],
                options: {
                    sourceMap: false
                }
            }
        },
        autoprefixer: {
            options: {
                // 一応 last 100 versionで設定。ほんとは last 2 version位でいいんだけど、、
                browsers: ['last 100 version', 'ie 8', 'ie 9']
            },
            dist: {
                src: '<%= dir.dist %>/**/*.css'
            }
        },
        sass: {
            dist: {
                options: {
                    noCache: true
                },
                expand: true,
                cwd: '<%= dir.dev %>',
                src: [
                    '**/*.scss',
                    '!**/_module.scss'
                ],
                dest: '<%= dir.dist %>',
                ext: '.css'
            }
        },
        jade: {
            dist: {
                options: {
                    pretty: true
                },
                expand: true,
                cwd: '<%= dir.dev %>',
                src: [
                    '**/*.jade',
                    // jadeディレクトリ内のjadeファイルはコンパイル無視
                    '!**/_jade/*.jade'
                ],
                dest: '<%= dir.dist %>',
                ext: '.html'
            }
        },
        typescript: {
            base: {
                src: ['<%= dir.dev %>/**/*.ts',
                    '!**/*.d.ts'
                ],
                dest: '<%= dir.dev %>',
                options: {
                    //module: 'amd', //or commonjs
                    target: 'es5', //or es3
                    sourceMap: true,
                    declaration: false,
                    ignoreTypeCheck: true
                }
            }
        },
        watch: {
            css: {
                files: ['<%= dir.dev %>/**/*.scss'],
                tasks: ['newer:sass', 'newer:autoprefixer']
            },
            //typescript:{
            //    files: ['<%= dir.dev %>/**/*.ts'],
            //    tasks: ['newer:typescript']
            //},
            js: {
                files: ['<%= dir.dev %>/**/*.js'],
                tasks: ["newer:concat",'newer:uglify']
            },

            jade: {
                files: ['<%= dir.dev %>/**/*.jade'],
                tasks: ['jade'/*, 'php'*/]
            },
            //img: {
            //    files: ['<%= dir.dev %>/**/*.{png,jpg,gif,svg}'],
            //    tasks: ['newer:copy']
            //},
            img: {
                files: ['<%= dir.dist %>/**/*.{png,jpg,gif,jpeg}'],
                tasks: ['image_check']
            },
            options: {
                livereload: true
            }
        }

    });
    var pkg = grunt.file.readJSON('package.json');
    Object.keys(pkg.devDependencies).forEach(function (devDependency) {
        if (devDependency.match(/^grunt\-/)) {
            grunt.loadNpmTasks(devDependency);
        }
    });

    //grunt.registerTask('php', function() {
    //    var exec = require('child_process').exec;
    //    var done = this.async();
    //    var command = 'cd dist/contact && mv index.html index.php; mv index_sp.html index_sp.php';
    //    var options = { timeout: 3000 };
    //    var callback = function(error, stdout, stderr) {
    //        if (stderr.length > 0) console.log('[ERROR]: ' +  stderr);
    //        if (stdout.length > 0) console.log(stdout);
    //        done();
    //    };
    //    exec(command, options, callback);
    //});

    grunt.registerTask('image_check', function() {
        var exec = require('child_process').exec;
        var done = this.async();
        var command = './image_check.sh';
        var options = { timeout: 30000 };
        var callback = function(error, stdout, stderr) {
            if (stderr.length > 0) console.log('[ERROR]: ' +  stderr);
            if (stdout.length > 0) console.log(stdout);
            done();
        };
        exec(command, options, callback);
    });

    grunt.registerTask('default', ['watch']);
    //grunt.registerTask('build', ['sass', 'autoprefixer','concat', 'uglify', 'jade', 'php', 'image_check']);
    grunt.registerTask('build-img', ['sass', 'autoprefixer', 'uglify', 'jade', 'imagemin']);  
};  