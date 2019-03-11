const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {dfPath, dfConfig } = require('./default.js');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

let config = Object.assign(dfConfig, {

    plugins: [
        new ExtractTextPlugin("[name]-bundle.css"),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            filename: '../index.html',
            template: './src/index.html'
        }),
        new webpack.ProvidePlugin({
            React: 'react',
            ReactDOM: 'react-dom',
            PT: 'prop-types',
            api: path.join(__dirname, 'src/common/api.js')
        }),
        new webpack.LoaderOptionsPlugin({
            options: {
                /**
                 * Sass
                 * Reference: https://github.com/jtangelder/sass-loader
                 * Transforms .scss files to .css
                 */
                sassLoader: {
                    //includePaths: [path.resolve(__dirname, "node_modules/foundation-sites/scss")]
                },
                /**
                 * PostCSS
                 * Reference: https://github.com/postcss/autoprefixer-core
                 * Add vendor prefixes to your css
                 */
                postcss: [
                    autoprefixer({
                        browsers: ['last 2 version']
                    })
                ]
            }
        })
    ],

    resolve: {
        modules: [
            'node_modules',
            dfPath.src,
            dfPath.common,
            dfPath.components,
            //dfPath.layout,
            //dfPath.view,
            dfPath.root
        ]
    }

});


config.module.rules.push(
    // {
    //     test: /\.js$/,
    //     use: ['eslint-loader'],
    //     enforce: 'pre',
    //     include:[
    //         dfPath.src
    //     ]
    // },
    {
        test: /\.js$/,
        use: ['babel-loader'],
        include:[
            dfPath.src,
            // dfPath.semantic
        ]
    },
    {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
    },
    {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: ['css-loader', 'postcss-loader', 'sass-loader']
        })
    }
);

module.exports = config;