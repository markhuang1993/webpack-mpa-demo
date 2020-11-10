const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    devtool: 'eval-cheap-source-map',
    entry: {
        //在webpack5裡面必須指定'dependOn:common',不然splitChunks會出錯
        index: {import: './src/js/index.js', dependOn: 'commons'},
        step1: {import: './src/js/step1.js', dependOn: 'commons'},

        //自己專案裡面的common
        commons: './src/js/common/my_common.js'
    },
    output: {
        path: path.join(__dirname, 'dist'),

        //基本都使用chunk的hash,如果考慮只更新css,就應該使用extract plugin + contenthash
        filename: '[name]/[name]_[chunkhash:8].js'
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery'",
            "window.$": "jquery"
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            publicPath: '[name]',
            filename: 'index/index.html',
            chunks: ['index', 'commons', 'vendors']
        }),
        new HtmlWebpackPlugin({
            template: './src/step1.html',
            filename: 'step1/step1.html',
            chunks: ['step1', 'commons', 'vendors']
        })
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]src[\\/]js[\\/]common/,
                    name: 'commons',
                    chunks: 'all',
                    reuseExistingChunk: true
                },
                vendors: {
                    test: /[\\/]node_modules[\\/](jquery|jquery-ui)[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                },
            }
        }
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        hot: true
    }
};
