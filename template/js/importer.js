import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Prevent caching of this module so module.parent is always accurate.
// console.log(import.meta['cache']);
// delete import.meta['cache'][import.meta.url];
// const parentFile = fileURLToPath(import.meta['url']);
// const parentFile = require.main.filename;
// const parentDirectory = path.dirname(parentFile || '.');

// The default file extensions used by `require()`.
const fileExtensions = new Set(['.js', '.ts', '.jsx', '.tsx', '.cjs', '.mjs']);

async function genericImport(directory, options) {
    if (directory.startsWith(".")) {
        throw new Error("Directory must be absolute");
    }
    // directory = path.resolve(parentDirectory, directory || '');
    console.log("Directory: ", directory);

    options = {
        camelize: true,
        fileExtensions,
        recursive: false,
        ...options
    };

    const files = fs.readdirSync(directory);

    const done = new Set();
    /** @type{Array<Record<string, any>} */const returnValue = [];

    for (const fileExtension of options.fileExtensions) {
        for (const file of files) {

            const filenameStem = path.basename(file).replace(/\.\w+$/, '');
            const fullPath = path.join(directory, file);

            if (options.recursive && fs.statSync(fullPath).isDirectory()) {
                const subModules = genericImport(fullPath, options);
                Object.keys(subModules).forEach(key => {
                    returnValue.push({
                        "fileName": `${file}/${key}`,
                        "value": subModules[key]
                    })
                });
                done.add(filenameStem);
            } else {
                const urlFromFullPath = `file://${fullPath}`;
                if (done.has(filenameStem) ||
                    path.extname(file) !== fileExtension ||
                    filenameStem[0] === '_' ||
                    filenameStem[0] === '.') {
                    continue;
                }
                const exportKey = options.camelize ? filenameStem.replace(/[-_](\w)/g, (m, p1) => p1.toUpperCase()) : filenameStem;
                returnValue.push({
                    "fileName": exportKey,
                    "value": await import(urlFromFullPath)
                });
                done.add(filenameStem);
            }
        }
    }

    return returnValue;
};

export default genericImport;

// import { promises as fs } from 'fs';
// import path from 'path';
// import { fileURLToPath } from 'url';

// const scriptFile = fileURLToPath(import.meta.url);
// const scriptFolder = path.dirname(scriptFile);

// const getImporterUrl = () => {
//     const error = new Error();
//     const stackTrace = error.stack || '';
//     console.log(stackTrace);
//     const callerFile = stackTrace.split('\n')[3];
//     const matched = callerFile.match(/\((.*):\d+:\d+\)/) || ['', ''];
//     return matched[1];
// };

// const importerUrl = new URL(getImporterUrl(), 'file://');
// const parentFolder = path.dirname(importerUrl.pathname);

// export async function findRoutes(directory) {
//     const absoluteDirectory = path.resolve(parentFolder, directory || '.');
//     console.log("absoluteDirectory: " + absoluteDirectory);
//     const files = await fs.readdir(absoluteDirectory);

//     const filesToImport = files.filter((file) => {
//         console.log(file);
//         return (
//             file != "all_routes.js" && // Do not include this file
//             path.extname(file) === '.js' // Only look at JS files
//         );
//     });

//     const modules = {};

//     await Promise.all(
//         filesToImport.map(async (file) => {
//             console.log(file);
//             const moduleUrl = new URL(file, `file://${scriptFolder}/`);
//             console.log(moduleUrl);
//             const moduleContents = await import(moduleUrl);
//             modules[moduleUrl] = moduleContents.default;
//         })
//     );

//     return modules;
// }

// export default routes = await findRoutes();