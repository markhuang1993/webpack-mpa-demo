import Util from "./util";
import * as HtmlWebpackPlugin from "html-webpack-plugin";

export default class ColaWebpackConfigProvider {

    private pageNames: string[];
    private relativePath: string;

    constructor(
        private environment: 'production' | 'development',
        pagesDir: string,
        relativePath: string,
        ignorePages: string[]
    ) {
        this.relativePath = relativePath.endsWith('/') ? relativePath : relativePath + '/';
        this.pageNames = Util.getPagesInDir(pagesDir, ignorePages);
    }

    defaultEntries() {
        const entry = {};
        for (const pageName of this.pageNames) {
            entry[pageName] = `${this.relativePath}${pageName}/${pageName}.js`;
        }
        return entry;
    }

    defaultHtmlPlugins(): HtmlWebpackPlugin[] {
        return this.pageNames.map(pageName => {
            return new HtmlWebpackPlugin({
                // template: './src/pages/index/index.html',
                template: `${this.relativePath}${pageName}/${pageName}.html`,
                filename: `web_static/${pageName}/${pageName}.html`,
                chunksSortMode: 'manual',
                chunks: [pageName]
            });
        })
    }

}
