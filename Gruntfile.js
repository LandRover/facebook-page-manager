 /*jslint node: true */
 module.exports = function(grunt) {

    var path = require('path');
    var cwd = process.cwd();
    
    // Print the execution time for the tasks
    require('time-grunt')(grunt);
    
    // loads npm
    require('load-grunt-tasks')(grunt);
    
    // init grunt
    require('load-grunt-config')(grunt, {
        configPath: path.join(cwd, '/build/tasks'),
        
        config: {
            pkg: grunt.file.readJSON('package.json'),
            
            build: {
                paths: {
                    //app: path.join(cwd, 'app'),
                    src: {
                        js: 'resources/assets/js',
                        assets: 'resources/assets',
                        images: 'resources/assets/images'
                    },
                    
                    debug: {
                        dir: path.join(cwd, 'public/debug'),
                        assets: path.join(cwd, 'public/debug/assets'),
                        images: path.join(cwd, 'public/debug/assets/images'),
                        index: path.join(cwd, 'public/release/index.debug.html')
                    },
                    
                    release: {
                        dir: path.join(cwd, 'public/build'),
                        assets: path.join(cwd, 'public/build/assets'),
                        images: path.join(cwd, 'public/build/assets/images'),
                        index: path.join(cwd, 'public/build/index.html')
                    },
                    
                    lib: {
                        node: path.join(cwd, '/node_modules'),
                        bower: path.join(cwd, '/bower_components')
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

};