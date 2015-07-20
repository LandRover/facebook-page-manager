module.exports = function(grunt, options) {
    var imagesSrcDir = '<%= build.paths.src.images %>',
        filesPattern = '**/*.{png,jpg,gif,svg,xml,json,ico}';
    
    return {
        debug: {
            dynamic: {
                files: [{
                    cwd: imagesSrcDir,
                    src: [filesPattern],
                    dest: '<%= build.paths.debug.images %>',
                    expand: true
                }]
            }
        },
        
        release: {
            dynamic: {
                files: [{
                    cwd: imagesSrcDir,
                    src: [filesPattern],
                    dest: '<%= build.paths.release.images %>',
                    expand: true
                }]
            }
        }
    };
};