const fs = require('fs');
const path = require('path');

const Util = {
    getPagesInDir(pagesDir, ignorePages: string[] = []): string[] {
        const pageNames = [];

        const files = fs.readdirSync(pagesDir);
        files.forEach((fileName) => {
            if (
                ignorePages.findIndex((em) => em === fileName) < 0 && // not in ignorePages
                fs.lstatSync(path.resolve(pagesDir, fileName)).isDirectory() // is Directory
            ) {
                pageNames.push(fileName);
            }
        });
        return pageNames;
    }
};
export default Util;
