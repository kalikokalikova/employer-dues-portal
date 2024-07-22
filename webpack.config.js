const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlInlineScriptPlugin = require('html-inline-script-webpack-plugin');

module.exports = {
    entry: "./src/index.mjs",
    mode: "development",
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "index.js"
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            filename: "cut-mailing-list.html",
            inject: "body"
        }),
        new HtmlInlineScriptPlugin({
            scriptMatchPattern: [/index.js/]
        })
    ],
    module: {
        rules: [
            {
                test: /.jsx?$/,
                loader: "babel-loader",
                exclude: /node_modules/
            }
        ]
    }
}