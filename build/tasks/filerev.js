module.exports = function(grunt, options) {
    return {
        release: {
            src: [
                '<%= build.paths.release.js %>/**/*.js',
                '<%= build.paths.release.css %>/**/*.css',
            ]
        },
        
        
        options: {
            length: 20,
            algorithm: 'md5',
            encoding: 'utf8'
        }
    };
};