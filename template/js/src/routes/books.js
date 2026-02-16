import { Route } from "bootpress";
import { Router } from "express";
import AddBookRequestDTO from "../dtos/AddBookRequestDTO.js";
import { bookService } from "../services/books.js";

const basepath = "/books";
const router = Router();

router.get("/", Route().to(bookService.findAllBooks));
router.get("/:year", Route().param("year").to(bookService.findByYear));
router.post("/", Route().body(AddBookRequestDTO).to(bookService.add));
router.delete("/", Route().query("name").to(bookService.deleteByName));

export default {
    basepath,
    router
};

