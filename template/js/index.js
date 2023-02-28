import express from "express";
import { createRequire } from "module";
import routes from "./routes/all";

const app = express();
app.use(express.json());

routes.forEach(router => app.use(router.value.basepath, router.value.router));

app.listen(8080, () => {
    console.log("listening on port 8080");
})