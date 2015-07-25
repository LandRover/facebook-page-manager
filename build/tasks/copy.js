module.exports = function(grunt, options) {
    
    return {
        fonts: {
            files: [
                {expand: true, src: '**', cwd: '<%= build.paths.lib.node %>/font-awesome/fonts', dest: '<%= build.paths.debug.fonts %>'},
                {expand: true, src: '**', cwd: '<%= build.paths.lib.node %>/material-design-iconic-font/dist/fonts', dest: '<%= build.paths.debug.fonts %>'},
                {expand: true, src: '**', cwd: '<%= build.paths.lib.node %>/roboto-fontface/fonts', dest: '<%= build.paths.debug.fonts %>'},
                {expand: true, src: '**', cwd: '<%= build.paths.lib.node %>/weather-icons/font', dest: '<%= build.paths.debug.fonts %>'},
                {expand: true, src: '**', cwd: '<%= build.paths.lib.node %>/bootstrap-sass/assets/fonts/bootstrap', dest: '<%= build.paths.debug.fonts %>'}
            ]
        },
        
        
        debug: {
            files: [
                {expand: true, src: '**/*', cwd: '<%= build.paths.src.dir %>/html', dest: '<%= build.paths.debug.assets %>/html'},
                {expand: true, src: '**/*', cwd: '<%= build.paths.src.dir %>/images', dest: '<%= build.paths.debug.assets %>/images'},
                {src: '<%= build.paths.lib.bower %>/ng-file-upload/FileAPI.flash.swf', dest: '<%= build.paths.debug.assets %>/FileAPI.flash.swf'},
                {src: '<%= build.paths.lib.bower %>/ng-file-upload/FileAPI.min.js', dest: '<%= build.paths.debug.assets %>/FileAPI.min.js'}
            ]
        }
    };
};