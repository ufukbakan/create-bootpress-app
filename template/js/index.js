import { log } from "bootpress/helpers";
import dotenv from "dotenv";
import express from "express";
import { configureLogger } from "./configuration/logger.js";
import routes from "./routes/_index.js";

dotenv.config();
const app = express();
configureLogger();

app.use(express.json());

routes.forEach(router => app.use(router.basepath, router.router));

const port = +process.env.PORT;

app.listen(port, () => {
    log.info(`Listening on port ${port}`);
});

export default app;