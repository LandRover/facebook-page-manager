module.exports = function(grunt, options) {
    return {
        release: {
            files: {
                '<%= build.paths.release.assets %>/css/app.css': '<%= build.paths.src.assets %>/sass/app.scss'
            }
        },
        
        options: {
            style: 'expanded'
        }
    };
};