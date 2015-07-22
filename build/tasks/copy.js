module.exports = function(grunt, options) {
    
    return {
        fonts: {
            files: [
                {expand: true, src: '**', cwd: '<%= build.paths.lib.bower %>/font-awesome/fonts', dest: '<%= build.paths.debug.fonts %>'},
                {expand: true, src: '**', cwd: '<%= build.paths.lib.bower %>/material-design-iconic-font/fonts', dest: '<%= build.paths.debug.fonts %>'},
                {expand: true, src: '**', cwd: '<%= build.paths.lib.bower %>/roboto-fontface/fonts', dest: '<%= build.paths.debug.fonts %>'},
                {expand: true, src: '**', cwd: '<%= build.paths.lib.bower %>/weather-icons/font', dest: '<%= build.paths.debug.fonts %>'},
                {expand: true, src: '**', cwd: '<%= build.paths.lib.bower %>/bootstrap-sass/assets/fonts/bootstrap', dest: '<%= build.paths.debug.fonts %>'}
            ]
        },
        
        
        debug: {
            files: [
                {expand: true, src: '**/*', cwd: '<%= build.paths.src.dir %>/html', dest: '<%= build.paths.debug.assets %>/html'},
                {src: '<%= build.paths.lib.bower %>/ng-file-upload/FileAPI.flash.swf', dest: '<%= build.paths.debug.assets %>/FileAPI.flash.swf'},
                {src: '<%= build.paths.lib.bower %>/ng-file-upload/FileAPI.min.js', dest: '<%= build.paths.debug.assets %>/FileAPI.min.js'}
            ]
        }
    };
};