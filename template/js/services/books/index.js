import { RestService } from "bootpress";
import { as, asStrict, getOrElse, getOrThrow } from "bootpress/helpers/index.js";
import { HttpError, HttpResponse } from "bootpress/types/index.js";
import { AddBookRequestDTO } from "./DTOs.js";

export class BookServiceImpl {
    #books = [ { name: "Kaşağı", year: 1919 }, { name: "Harry Potter", year: 1997 }, { name: "Don Quixote", year: 1605 } ];

    findAllBooks() {
        return this.#books;
    }

    findByYear(yearInParam) {
        const year = as(yearInParam, "integer"); // throws an error if the year is not parsable to an integer
        return getOrThrow(this.#books.filter(book => book.year === year), new HttpError(404, `Couldn't find a book in year ${year}`))
    }

    add(body) {
        const validBody = asStrict(body, AddBookRequestDTO); // throws an error if body doesn't fit schema
        // validBody now has intellisense type recommendations { name, year }
        const book = {
            name: validBody.name,
            year: getOrElse(validBody.year, 2023)
        };
        this.#books.push(book);
        return new HttpResponse(201, book);
    }

    deleteByName(name) {
        name = getOrThrow(name, new HttpError(400, "Name is required"));
        const idx = this.#books.findIndex(book => book.name === name);
        if (idx > -1) {
            this.#books.splice(idx, 1);
            return `Deleted ${name}`;
        } else {
            throw new HttpError(404, "Book not found");
        }
    }
}

export const bookService = RestService(BookServiceImpl);