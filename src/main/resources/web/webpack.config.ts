import * as path from 'path';
import * as HtmlWebpackPlugin from "html-webpack-plugin";
import * as webpack from "webpack";

const config: webpack.Configuration = {
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
        // path: path.resolve(__dirname, '../../webapp/dist'),

        //基本都使用chunk的hash,如果考慮只更新css,就應該使用extract plugin + contenthash
        filename(chunkData) {
            const chunk = chunkData.chunk;
            const hash = chunkData.hash.slice(0, 8);
            return `web_static/${chunk.name}/${chunk.name}_${hash}.js`
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'web_static/index/index.html',
            chunksSortMode: 'manual',
            chunks: ['index', 'commons']
        }),
        new HtmlWebpackPlugin({
            template: './src/step1.html',
            filename: 'web_static/step1/step1.html',
            chunksSortMode: 'manual',
            chunks: ['commons', 'step1']
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
                    chunks: 'all'
                },
            }
        }
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        hot: true
    }
};


export default config;
