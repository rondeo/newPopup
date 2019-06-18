const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    mode: 'development',
    entry: {
        toolbarContent: ['babel-polyfill', './src/toolbarContent/toolbarContent.js'],
        popup: ['babel-polyfill', './src/popup/popup.js'],
    },
    devServer: {
        contentBase: './public'
    },
    plugins: [
        // new CleanWebpackPlugin(),
        new ExtractTextPlugin({filename:'css/[name].css', allChunks: true}),
        // new HtmlWebpackPlugin({
        //     filename: './html/toolbarContent-mini.html',
        //     title: 'Widget',
        //     template: './src/toolbarContent/toolbarContent-mini.html'
        // })
    ],
    output: {
        filename: 'js/[name].js',
        path: path.resolve(__dirname, 'public')
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                resolve: {
                    extensions: ['.js', '.jsx'],
                },
                use: [{
                    loader: "babel-loader"
                }]
            },
            {
                test: /\.(less|css)$/,
                loader: ExtractTextPlugin.extract(
                    {
                        fallback: 'style-loader',
                        use: [
                            { loader: 'css-loader'},
                            { loader: 'less-loader' }
                        ],
                        filename : 'popup.css',
                        publicPath: '/public/css'

                    }
                )
            },
            {
                test: /\.svg$/,
                use: ['@svgr/webpack'],
            },
        ]
    }
};