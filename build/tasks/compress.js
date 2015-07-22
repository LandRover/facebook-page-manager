module.exports = function(grunt, options) {
    return {
        release: {
            files: [{
                expand: true,
                
                src: [
                    '<%= build.paths.src.dir %>/**',
                    'config/**',
                    '<%= build.paths.release.dir %>/**',
                    '<%= build.paths.src.dir %>/html/**',
                    '<%= build.paths.src.index %>',
                    '.bowerrc', '.gitignore', 'bower.json', 'CHANGELOG.md', 'Gruntfile.js', 'package.json', 'README.md',
                    '!<%= build.paths.src.dir %>/html/build/**',
                    '!config/html.js',
                    '!releases/**'
                ],
                
                dest: '.'
            }]
        },
        
        
        options: {
            archive: 'releases/<%= pkg.name %>.<%= pkg.version %>.zip'
        }
    };
};