import * as path from 'path';
import * as HtmlWebpackPlugin from "html-webpack-plugin";
import * as webpack from "webpack";
import ColaWebpackConfigProvider from "./src/node/cola";

const configProvider = new ColaWebpackConfigProvider(
    "development",
    path.join(__dirname, 'src/pages'),
    './src/pages',
    ['common']
);
const config: webpack.Configuration = {
    devtool: 'eval-cheap-source-map',
    entry: {
        ...configProvider.defaultEntries()
    },
    output: {
        path: path.join(__dirname, 'dist'),
        // path: path.resolve(__dirname, '../../webapp/dist'),

        //基本都使用chunk的hash,如果考慮只更新css,就應該使用extract plugin + contenthash
        filename(chunkData) {
            const chunk = chunkData.chunk;
            const hash = chunkData.hash.slice(0, 8);
            return `web_static/${chunk.name}/${chunk.name}_${hash}.js`
        },
        // publicPath: 'rr'
    },
    plugins: [
        ...configProvider.defaultHtmlPlugins()
    ],
    optimization: {
        splitChunks: {
            chunks: 'all',
            minSize: 1,
            cacheGroups: {
                commons: {
                    test: /[\\/]src[\\/]pages[\\/]common/,
                    name: 'commons'
                },
                vendors: {
                    test: /[\\/]node_modules[\\/](jquery|jquery-ui)[\\/]/,
                    name: 'vendors',
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
