import { PassParams, PassQueries, PassBody } from "bootpress";
import { Router } from "express";
import { bookService } from "../services/books";

const basepath = "/books";
const router = Router();

router.get("/", bookService.findAllBooks());
router.get("/:year", PassParams("year")(bookService.findByYear));
router.post("/", PassBody(bookService.add));
router.delete("/", PassQueries("name")(bookService.deleteByName));

export {
    basepath,
    router
};
