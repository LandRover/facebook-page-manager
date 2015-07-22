module.exports = function(grunt, options) {
    return {
        debug: {
            files: {
                '<%= build.paths.debug.index %>': ['<%= build.paths.src.index %>']
            },
            
            
            options: {
                pattern: 'demo',
                fileOverride: true
            }
        },
        
        
        release: {
            files: {
                '<%= build.paths.release.index %>': ['<%= build.paths.src.index %>']
            },
            
            
            options: {
                pattern: 'build',
                fileOverride: true
            }
        }
    };
};