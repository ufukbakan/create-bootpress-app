import { PassBody, PassParams, PassQueries } from "bootpress";
import { Router } from "express";
import { bookService } from "../services/books";
import { AddBookRequestDTO } from "../services/books/DTOs";

const basepath = "/books";
const router = Router();

router.get("/", bookService.findAllBooks());
router.get("/:year", PassParams("year")(bookService.findByYear));
router.post("/", PassBody(bookService.add));
router.delete("/", PassQueries("name")(bookService.deleteByName));

export {
    basepath,
    router
}