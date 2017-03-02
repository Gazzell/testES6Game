const path = require("path");
const webpack = require("webpack");

module.exports = {

    entry: {
        script: path.resolve(__dirname, "./src/index.es6")
    },

    module: {
        rules: [
            {
                test: /\.es6$/,
                use: "babel-loader",
                exclude: /(\/node_modules\/|test\.es6|\.spec\.es6$)/
            }
        ]
    },

    output: {
        path: "./dist",
        filename: "pacman.js",
        pathinfo: true
    },

    resolve: {
        extensions: [".js",".es6"],
        modules: [
            __dirname,
            path.resolve(__dirname, "./node_modules")
        ]
    },

    devtool: "inline-source-map"

}