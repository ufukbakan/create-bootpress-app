import express from "express";
import { dirname, resolve } from "path";
import { cwd } from "process";
import { fileURLToPath } from "url";
import importer from "./importer.js";
const routes = await importer(resolve(dirname(fileURLToPath(import.meta.url)), "./routes"));
// console.log(cwd());
// console.log(dirname(fileURLToPath(import.meta.url)));
// const routes = await importer(cwd(), "./routes");
console.log(routes);

const app = express();
app.use(express.json());
routes.forEach(router => app.use(router.value.basepath, router.value.router));

app.listen(8080, () => {
    console.log("listening on port 8080");
})

export default app;