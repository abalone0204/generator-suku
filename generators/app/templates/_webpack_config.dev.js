var webpack = require('webpack');
var path = require('path');

module.exports = {
    devtool: 'eval',
    entry: [
        'webpack-hot-middleware/client',
        './src/main'
    ],
    output: {
        path: path.join(__dirname, 'static/'),
        filename: "bundle.js",
        publicPath: '/static/'
    },
    module: {
        loaders: [{
            test: /\.scss$/,
            loader: 'style!css!sass'
        }, {
            test: /\.js$/,
            loaders: ['babel'],
            include: path.join(__dirname, 'src')
        }, {
            test: /\.png$/,
            loader: "url-loader?limit=100000"
        }, {
            test: /\.jpg$/,
            loader: "file-loader"
        }]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ]
};
