import { RestService } from "bootpress";
import { as, asInteger, getOrThrow } from "bootpress/helpers";
import { HttpError, HttpResponse } from "bootpress/types";
import { AddBookRequestDTO } from "./DTOs";

class BookService {
    #books = [ { name: "Kaşağı", year: 1919 }, { name: "Harry Potter", year: 1997 }, { name: "Don Quixote", year: 1605 } ];

    findAllBooks() {
        return this.#books;
    }

    findByYear(yearInParam) {
        const year = asInteger(yearInParam); // throws an error if the year is not an integer
        // const year = as(yearInParam, "integer"); // does the same job
        return getOrThrow(this.#books.find(book => book.year === year), new HttpError(404, `Couldn't find a book in year ${year}`))
    }

    add(body) {
        const parsedBody = as(body, AddBookRequestDTO);
        // parsedBody now has intellisense fields { name, year }
        // also it returns a Http Error if body doesn't fit schema
        this.#books.push({
            name: parsedBody.name,
            year: parsedBody.year ?? 2023
        });
        return new HttpResponse(201, "Added book");
    }

    deleteByName(name) {
        const idx = this.#books.findIndex(book => book.name === name);
        if (idx > -1) {
            this.#books.splice(idx, 1);
            return "Deleted";
        } else {
            throw new HttpError(404, "Book not found");
        }
    }
}

export const bookService = RestService(BookService);