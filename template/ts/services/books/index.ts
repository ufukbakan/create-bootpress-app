import { RestService } from "bootpress";
import { asInteger, getOrThrow } from "bootpress/helpers";
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
        const year = asInteger(yearInParam); // throws an error if the year is not an integer
        // const year = as(yearInParam, "integer"); // does the same job
        return getOrThrow(this.#books.find(book => book.year === year), new HttpError(404, `Couldn't find a book in year ${year}`))
    }

    add(body: AddBookRequest) {
        const defaultValues = { year: 2023 };
        this.#books.push({...defaultValues, ...body});
        return new HttpResponse(201, "Added book");
    }

    deleteByName(name: string) {
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