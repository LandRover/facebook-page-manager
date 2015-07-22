module.exports = function(grunt, options) {
    return {
        js: {
            files: [
                'Gruntfile.js',
                '<%= build.paths.src.js %>/**/*.js'
            ],
            
            tasks: ['jshint']
        },
        
        css: {
            files: [
                '<%= build.paths.src.css %>/**/*.scss'
            ],
            
            tasks: ['sass'],
        },
        
        options: {
            livereload: true
        }
    };
};