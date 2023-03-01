import fs from "fs";
import { dirname, relative, resolve } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const routes = [];
const allowedExts = ["js"];
for(const file of fs.readdirSync(__dirname, { withFileTypes: true })){
    const absolutePath = resolve(__dirname, file.name);
    if(file.name == "all_routes.js"){
        continue;
    }else if(fs.statSync(absolutePath).isFile() && allowedExts.includes(file.name.split(".").at(-1)) ){
        const relativePath = "./" + relative(__dirname, absolutePath).toString();
        routes.push({
            fileName: file.name,
            value: await import(relativePath)
        });
    }
};

export default routes;
