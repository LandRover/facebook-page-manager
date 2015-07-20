module.exports = function(grunt, options) {
    return {
        release: [
            '<%= build.paths.release.dir %>'
        ]
    };
};