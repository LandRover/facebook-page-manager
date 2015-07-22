module.exports = function(grunt, options) {
    var webpack = require('webpack'),
        __node_dir = options.build.paths.lib.node,
        __bower_dir = options.build.paths.lib.bower;

    return {
        options: {
            debug: true,
            resolve: {
                fallback: __bower_dir,
                
                modulesDirectories: [
                    options.build.js,
                    options.build.src
                ],
                
                alias: {
                    //jQuery: __bower_dir + '/jquery/src/jquery.js',
                    lodash: __bower_dir + '/lodash/lodash.js'
                }
            },
            
            devtool: 'cheap-source-map',
            
            stats: {
                timings: true,
                color: true,
                reasons: true
            },
            
            module: {
                loaders: [
                    { test: /\.html$/, loader: 'html-loader' }
                ]
            },
            
            progress: true,
            
            externals: {
                jquery: 'jquery',
                lodash: 'lodash'
            }
        },
        
        
        /**
         *
         */
        debug: {
            debug: true,
            
            entry: {
                fbpgmngr: options.build.js + '/fb-pg-mngr.js'
            },
            
            output: {
                path: options.build.dir.debug,
                filename: 'fb-pg-mngr.js',
                library: 'fb-pg-mngr',
                libraryTarget: 'umd',
                pathinfo: true
            },
            
            plugins: [
                new webpack.DefinePlugin({
                    __DEBUG__: true
                }),
                
                new webpack.ProvidePlugin({
                    $: "jquery",
                    jquery: "jquery",
                    "window.jQuery": "jquery",
                    _: "lodash"
                })
            ]
        },
        
        
        /**
         *
         */
        release: {
            entry: {
                fbpgmngr: options.build.js + '/fb-pg-mngr.js'
            },
            
            output: {
                path: options.build.dir.release,
                filename: 'fb-pg-mngr.js',
                library: 'fb-pg-mngr',
                libraryTarget: 'umd',
                pathinfo: true
            },
            
            plugins: [
                new webpack.DefinePlugin({
                    __DEBUG__: false
                }),
                
                new webpack.DefinePlugin({'process.env.NODE_ENV': '"production"'}),
                new webpack.optimize.DedupePlugin(),
                new webpack.optimize.UglifyJsPlugin({ sourceMap: false }),
                new webpack.optimize.OccurenceOrderPlugin(),
                new webpack.optimize.AggressiveMergingPlugin()
            ]
        }
    };
};