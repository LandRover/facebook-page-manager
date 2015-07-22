module.exports = function(grunt, options) {
    return {
        html: [
            '<%= build.paths.release.index %>', '<%= build.paths.release.dir %>/pages/*.html'
        ],
        
        options: {
            assetsDirs: [
                '<%= build.paths.release.dir %>',
                '<%= build.paths.release.dir %>/pages/'
            ],
            
            patterns: {
                html: [[
                    /(<!-- reusebuild:css .+? -->[\s\S\r\n]*?<!-- endreusebuild -->)/gm,
                    
                    'Re-use css build',
                    
                    function (m) {
                        return m.match(/[\/.a-z]*?\.css/gm)[0];
                    },
                    
                    function (m) {
                        return '<link href="'+m+'" rel="stylesheet" />';
                    }
                ],
                [
                    /(<!-- reusebuild:js .+? -->[\s\S\r\n]*?<!-- endreusebuild -->)/gm,
                    
                    'Re-use js build',
                    
                    function (m) {
                        return m.match(/[\/.a-z]*?\.js/gm)[0];
                    },
                    
                    function (m) {
                        return '<script charset="utf-8" src="'+m+'"></script>';
                    }
                ]]
            }
        }
    };
};