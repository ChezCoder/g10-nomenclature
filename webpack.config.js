// @ts-check

const path = require("path");
const webpack = require("webpack");
const devServer = require("webpack-dev-server");

/** @type {webpack.Configuration}  */
const config = {
    devServer: {
        port: 3000,
        static: {
            directory: path.join(__dirname, ".")
        },
        host: "localhost",
        compress: true,
        client: {
            overlay: true,
            logging: "info",
            progress: true
        },
        hot: true
    },
    mode: "development",
    entry: "./src/index.ts",
    output: {
        path: path.resolve(__dirname, "."),
        filename: "./dist/bundle.js"
    },
    devtool: "source-map",
    resolve: {
        extensions: [".ts", ".js"]
    },
    module: {
        rules: [
            {
                test: /.ts/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "ts-loader"
                    }
                ]
            }
        ]
    }
};

module.exports = config;
