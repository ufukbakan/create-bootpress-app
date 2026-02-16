import { log } from "bootpress/helpers";
import dotenv from "dotenv";
import express from "express";
import { configureLogger } from "./src/configuration/logger";
import routes from "./src/routes/_index";

dotenv.config();
const app = express();
configureLogger();

app.use(express.json());

routes.forEach(route => app.use(route.basepath, route.router));

const port = Number(process.env.PORT);
app.listen(port, () => {
    log.info(`Listening on port ${port}`);
});

export default app;