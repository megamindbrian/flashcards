const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const helpers = require('./helpers');
const EVENT = process.env.npm_lifecycle_event || '';
const env = EVENT.includes('prod') ? 'prod' : 'dev';

module.exports = {
    target: 'web',

    entry: {
        'polyfills': './src/polyfills.ts',
        'vendor': './src/vendor.ts',
        'app': './src/main.ts'
    },

    resolve: {
        extensions: ['.js', '.ts'],
        modules: [helpers.root('node_modules')]
    },

    module: {
        loaders: [
            {
                test: /\.ts$/,
                exclude: [
                    helpers.root('node_modules'),
                    "src/**/*.spec.js"
                ],
                loaders: ['ts-loader', 'angular2-template-loader', 'angular2-router-loader']
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                loader: 'file-loader?name=assets/[name].[hash].[ext]'
            },
            {
                test: /\.css$/,
                exclude: helpers.root('src', 'app'),
                loader: ExtractTextPlugin.extract({fallback: 'style-loader', use: 'css-loader?sourceMap'})
            },
            {
                test: /\.less$/,
                exclude: helpers.root('src', 'app'),
                loader: ExtractTextPlugin.extract({fallback: 'style-loader', use: 'css-loader?sourceMap!sass-loader'})
            },
            {
                test: /\.css$/,
                include: helpers.root('src', 'app'),
                loaders: ['css-to-string-loader', 'css-loader', 'raw-loader']
            },
            {
                test: /\.less$/,
                include: helpers.root('src', 'app'),
                loader: 'raw-loader!less-loader'
            },
            {
                test: /\.scss$/,
                loaders: ['css-to-string-loader', 'css-loader', 'sass-loader']
            }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: ['app', 'vendor', 'polyfills']
        }),

        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),

        new CopyWebpackPlugin([
            {from: 'src/assets', to: 'assets'},
            {from: 'web.config', to: ''},
        ]),
    ],

    node: {
        net: 'empty',
        dns: 'empty'
    }
};
