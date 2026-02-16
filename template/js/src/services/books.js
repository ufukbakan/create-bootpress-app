import { HttpError, HttpResponse, as, getOrElse, getOrThrow } from "bootpress/helpers";

export class BookServiceImpl {
    #books = [{ name: "Harry Potter", year: 1997 }, { name: "Don Quixote", year: 1605 }];

    // Direct return
    findAllBooks = () => {
        return this.#books; // status will be 200 by default
    }

    // getOrThrow
    findByYear = (yearInParam) => {
        const year = as(yearInParam, "integer"); // throws an error if the year is not parsable to an integer
        return getOrThrow(
            this.#books.filter(book => book.year === year),
            new HttpError(404, `Couldn't find a book in year ${year}`)
        );

    }

    // getOrElse
    add = (body) => {
        const book = {
            name: body.name,
            year: getOrElse(body.year, new Date().getFullYear()) // fallback to current year if not provided
        };
        this.#books.push(book);
        return new HttpResponse(201, book);
    }

    // Response with builders
    deleteByName = (name) => {
        name = getOrThrow(name, new HttpError(400, "Name is required"));
        const idx = this.#books.findIndex(book => book.name === name);
        if (idx > -1) {
            this.#books.splice(idx, 1);
            return HttpResponse.builder().status(200).data(`Deleted ${name}`).build();
        } else {
            throw HttpError.builder().status(404).message("Book not found").build();
        }
    }
}

export const bookService = new BookServiceImpl();