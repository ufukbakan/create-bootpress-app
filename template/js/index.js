import importAll from "esm-importer";
import express from "express";
const routes = await importAll("./routes");

const app = express();
app.use(express.json());
routes.forEach(router => app.use(router.value.basepath, router.value.router));

app.listen(8080, () => {
    console.log("listening on port 8080");
})

export default app;