import fs from "fs";
import { dirname, relative } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const routes = [];
const allowedExts = ["js"];
for(const file of fs.readdirSync(__dirname, { withFileTypes: true })){
    if(file.name == "all_routes.js"){
        continue;
    }else if(fs.statSync(file).isFile() && allowedExts.includes(file.name.split(".").at(-1)) ){
        const relativePath = relative(__dirname, file);
        console.log(relativePath);
        routes.push(await import(relativePath));
    }
};

export default routes;
