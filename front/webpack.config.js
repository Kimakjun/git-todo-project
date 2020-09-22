const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
module.exports = {
    mode : 'development',
    entry: {
        main : './src/index.js'
    },
    output: {
        path: path.resolve('./dist'),
        filename: '[name].js',
    },
    devtool: 'inline-source-map',

    module: {
        rules:[
            {
                test : /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test : /\.png$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]?[hash]'
                        }
                    }
                ]
            }
        ]
    },
    plugins:[
        new HTMLWebpackPlugin({
            template: './src/index.html'
        }),
        new CleanWebpackPlugin(),
    ]
}