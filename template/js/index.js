import importAll from "esm-importer";
import express from "express";
import dotenv from "dotenv";
import { configureLogger } from "./configuration/logger.js";
import { log } from "bootpress/helpers/index.js";
const routes = await importAll("./routes");

dotenv.config();
const app = express();
configureLogger();

app.use(express.json());
app.use((req, _res, next) => { if (Object.keys(req.body).length < 1) { req.body = null; }; next(); });

routes.forEach(router => app.use(router.value.basepath, router.value.router));

const port = +process.env.PORT;
app.listen(port, () => {
    log.info(`Listening on port ${port}`);
});

export default app;