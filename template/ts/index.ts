import { log } from "bootpress/helpers";
import dotenv from "dotenv";
import express from "express";
import genericImport from "generic-import";
import { RouterModule } from "./common/types";
import { configureLogger } from "./configuration/logger";

dotenv.config();
const app = express();
configureLogger();

app.use(express.json());
app.use((req, _res, next) => { if (Object.keys(req.body).length < 1) { req.body = null; }; next(); });

const routers = genericImport<RouterModule>("routes");

routers.forEach(router => app.use(router.value.basepath, router.value.router));

const port = Number(process.env.PORT);
app.listen(port, () => {
    log.info(`Listening on port ${port}`);
});

export default app;