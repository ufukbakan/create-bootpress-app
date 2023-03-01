import express from "express";
import routes from "./routes/all_routes.js";

const app = express();
app.use(express.json());
routes.forEach(router => app.use(router.value.basepath, router.value.router));

app.listen(8080, () => {
    console.log("listening on port 8080");
})