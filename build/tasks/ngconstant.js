module.exports = function(grunt, options) {
    return {
        release: {
          constants: {
            app: {
              version: '<%= pkg.version %>'
            }
          }
        },
        
        
        options: {
            dest: '<%= build.paths.src.js %>/app.definitions.js',
            name: 'app.definitions',
        }
    };
};