module.exports = function(grunt, options) {
    return {
        release: {
            files: {
                src: [
                      '<%= build.paths.release.dir %>/*.css',
                      '<%= build.paths.release.dir %>/*.js'
                ]
            },
            
            
            options: {
                position: 'top',
                banner: '/*! <%=  grunt.template.today("dd-mm-yyyy hh:MM:ss")  %> */',
                linebreak: true
            }
        }
    };
};