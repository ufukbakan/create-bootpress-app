import { PassBodyAs, PassParam, PassQuery } from "bootpress";
import { Router } from "express";
import { bookService } from "../services/books";
import { AddBookRequestDTO } from "../services/books/DTOs";

const basepath = "/books";
const router = Router();

router.get("/", bookService.findAllBooks());
router.get("/:year", PassParam("year")(bookService.findByYear));
router.post("/", PassBodyAs(AddBookRequestDTO)(bookService.add));
router.delete("/", PassQuery("name")(bookService.deleteByName));

export {
    basepath,
    router
};
