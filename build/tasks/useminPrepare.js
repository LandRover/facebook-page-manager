module.exports = function(grunt, options) {
    return {
        html: '<%= build.paths.debug.index %>',
        
        options: {
            root: '<%= build.paths.src.dir %>',
            dest: '<%= build.paths.release.dir %>'
        }
    };
};