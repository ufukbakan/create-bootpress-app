import { Router } from "express";
import { homeService } from "../services/home.js";

const basepath = "/";
const router = Router();

router.get("/", homeService.getHomePage);

export default {
    basepath,
    router
}