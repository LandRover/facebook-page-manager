module.exports = function(grunt, options) {
    return {
        debug: {
            files: [
                {'<%= build.paths.debug.css %>/app.css': '<%= build.paths.src.css %>/sass/app.scss'},
                {'<%= build.paths.debug.css %>/vendors.css': '<%= build.paths.src.css %>/sass/vendors.scss'}
            ],
            
            options: {
                style: 'expanded'
            }
        }
    };
};