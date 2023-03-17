import express from "express";
import genericImport from "generic-import";
import { RouterModule } from "./common/types";

const app = express();
app.use(express.json());

const routers = genericImport<RouterModule>("routes");

routers.forEach(router => app.use(router.value.basepath, router.value.router));

app.listen(8080, () => {
    console.log("listening on port 8080");
})

export default app;