 /*jslint node: true */
 module.exports = function(grunt) {

    var path = require('path'),
        cwd = process.cwd(),
        dirs = {
            src: 'resources/assets',
            debug: 'public/debug',
            release: 'public/build'
        };
    
    // Print the execution time for the tasks
    require('time-grunt')(grunt);
    
    // loads npm
    require('load-grunt-tasks')(grunt);
    
    // init grunt
    require('load-grunt-config')(grunt, {
        configPath: path.join(cwd, 'build/tasks'),
        
        config: {
            pkg: grunt.file.readJSON('package.json'),
            
            build: {
                paths: {
                    //app: path.join(cwd, 'app'),
                    src: {
                        dir: path.join(dirs.src),
                        js: path.join(dirs.src, 'js'),
                        css: path.join(dirs.src, 'css'),
                        images: path.join(dirs.src, 'images'),
                        index: path.join(dirs.src, 'index.src.html')
                    },
                    
                    debug: {
                        dir: path.join(dirs.debug),
                        assets: path.join(dirs.debug, 'assets'),
                        js: path.join(dirs.debug, 'assets/js'),
                        css: path.join(dirs.debug, 'assets/css'),
                        images: path.join(dirs.debug, 'assets/images'),
                        fonts: path.join(dirs.debug, 'assets/fonts'),
                        index: path.join(dirs.debug, 'index.html')
                    },
                    
                    release: {
                        dir: path.join(dirs.release),
                        assets: path.join(dirs.release, 'assets'),
                        js: path.join(dirs.release, 'assets/js'),
                        css: path.join(dirs.release, 'assets/css'),
                        images: path.join(dirs.release, 'assets/images'),
                        fonts: path.join(dirs.release, 'assets/fonts'),
                        index: path.join(dirs.release, 'index.html')
                    },
                    
                    lib: {
                        node: path.join(cwd, 'node_modules'),
                        bower: path.join(cwd, 'bower_components')
                    }
                },
                
                banner: require('fs').readFileSync(path.join(cwd, 'build/banner.txt'), 'utf8')
            }
        }
    });
    
    // Default task
    grunt.registerTask('default', [
        'jshint:src'
    ]);
    
    // Common task
    grunt.registerTask('common', [
        'sass',
        //'ngconstant',
        'copy:debug',
        'useminPrepare',
        'concat:generated',
        'cssmin',
        'uglify:generated',
        'filerev',
        'usemin',
        'imagemin',
        'usebanner'
    ]);
    
    
    // Common task
    grunt.registerTask('debug', [
        'grep:debug',
        'common'
    ]);
};