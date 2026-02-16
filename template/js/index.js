import { log } from "bootpress/helpers";
import dotenv from "dotenv";
import express from "express";
import { configureLogger } from "./src/configuration/logger.js";
import routes from "./src/routes/_index.js";

dotenv.config();
const app = express();
configureLogger();

app.use(express.json());

routes.forEach(router => app.use(router.basepath, router.router));

const port = +process.env.PORT;

app.listen(port, (error) => {
    if (error) {
        log.error(error);
        return;
    }
    log.info(`Listening on port ${port}`);
});

export default app;