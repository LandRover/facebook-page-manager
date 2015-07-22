module.exports = function(grunt, options) {
    return {
        debug: {
            files: {
                '<%= build.paths.debug.css %>/app.css': '<%= build.paths.src.css %>/sass/app.scss'
            }
        },
        
        
        options: {
            style: 'expanded'
        }
    };
};