module.exports = function(grunt, options) {
    return {
        release: {
          constants: {
            app: {
              version: '<%= pkg.version %>'
            }
          }
        }
    };
};