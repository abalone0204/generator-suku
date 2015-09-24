var webpack = require('webpack');
var path = require('path');
var node_modules = path.resolve(__dirname, 'node_modules');
var pathToReact = path.resolve(node_modules, 'react/dist/react.min.js');
var PROD = JSON.parse(process.env.PROD_DEV || "0");
module.exports = {
    entry: {
        <%= entryName %>: path.resolve(__dirname, 'js/<%= entry %>'),
    },
    resolve: {
        alias: {
            'react': pathToReact
        }
    },
    output: {
        path: __dirname,
        filename: PROD ? "[name]_bundle.min.js" : "[name]_bundle.js",
        devtool: "source-map"
    },
    module: {
        loaders: [{
            test: /\.scss$/,
            loader: 'style!css!sass'
        }, {
            test: /\.jsx?$/,
            loader: 'babel'
        }, {
            test: /\.png$/,
            loader: "url-loader?limit=100000"
        }, {
            test: /\.jpg$/,
            loader: "file-loader"
        }],
        noParse: [pathToReact]
    },
    plugins: PROD ? [
        new webpack.optimize.UglifyJsPlugin({
            minimize: true
        })
    ] : []
};
