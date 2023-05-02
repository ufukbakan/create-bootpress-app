import { PassBody, PassParam, PassQuery } from "bootpress";
import { Router } from "express";
import { bookService } from "../services/books/index.js";

const basepath = "/books";
const router = Router();

router.get("/", bookService.findAllBooks());
router.get("/:year", PassParam("year")(bookService.findByYear));
router.post("/", PassBody(bookService.add));
router.delete("/", PassQuery("name")(bookService.deleteByName));

export {
    basepath,
    router
};
