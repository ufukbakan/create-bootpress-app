import { RestService } from "bootpress";
import { as, getOrElse, getOrThrow } from "bootpress/helpers";
import { HttpError, HttpResponse } from "bootpress/types";
import { AddBookRequest } from "./DTOs";

type Book = {
    name: string,
    year: number
}

class BookService {
    #books: Book[] = [ { name: "Kaşağı", year: 1919 }, { name: "Harry Potter", year: 1997 }, { name: "Don Quixote", year: 1605 } ];

    findAllBooks() {
        return this.#books;
    }

    findByYear(yearInParam: string) {
        const year = as(yearInParam, "integer"); // throws an error if the year is not parsable to an integer
        return getOrThrow(this.#books.find(book => book.year === year), new HttpError(404, `Couldn't find a book in year ${year}`))
    }

    add(body: AddBookRequest) {
        const book: Book = {
            name: body.name,
            year: getOrElse(body.year, 2023)
        };
        this.#books.push(book);
        return new HttpResponse(201, book);
    }

    deleteByName(name: string) {
        const idx = this.#books.findIndex(book => book.name === name);
        if (idx > -1) {
            this.#books.splice(idx, 1);
            return `Deleted ${name}`;
        } else {
            throw new HttpError(404, "Book not found");
        }
    }
}

export const bookService = RestService(BookService);