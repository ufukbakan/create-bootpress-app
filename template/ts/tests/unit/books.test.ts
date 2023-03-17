import { HttpError, HttpResponse } from "bootpress/types";
import { expect } from "chai";
import { BookServiceImpl } from "../../services/books";

describe("BookServiceImpl", () => {
    let bookService = new BookServiceImpl();

    describe("#findAllBooks()", () => {
        it("should return an array of books", () => {
            const allBooks = bookService.findAllBooks();
            expect(Array.isArray(allBooks)).to.be.true;
            allBooks.forEach(book => {
                expect(typeof book.name).to.equal("string");
                expect(typeof book.year).to.equal("number");
            });
        });
    });

    describe("#findByYear(yearInParam: string)", () => {
        it("should return the correct book for a given year", () => {
            const expectedBook = { name: "Don Quixote", year: 1605 };
            const foundBook = bookService.findByYear("1605");
            expect(foundBook).to.deep.equal(expectedBook);
        });

        it("should throw an HttpError with status code 404 when no book is found for a given year", () => {
            expect(() => bookService.findByYear("2022")).to.throw(HttpError, /Couldn't find a book in year 2022/);
        });
    });

    describe("#add(body: AddBookRequest)", () => {
        it("should add a book to the list of books", () => {
            const newBook = { name: "New Book", year: 2023 };
            const initialLength = bookService.findAllBooks().length;
            const response = bookService.add(newBook);
            const newLength = bookService.findAllBooks().length;
            expect(response).to.deep.equal(new HttpResponse(201, newBook));
            expect(newLength).to.equal(initialLength + 1);
        });
    });

    describe("#deleteByName(name: string)", () => {
        it("should remove a book from the list of books", () => {
            const bookToDelete = { name: "Harry Potter", year: 1997 };
            const initialLength = bookService.findAllBooks().length;
            const response = bookService.deleteByName("Harry Potter");
            const newLength = bookService.findAllBooks().length;
            expect(response).to.equal(`Deleted Harry Potter`);
            expect(newLength).to.equal(initialLength - 1);
        });

        it("should throw an HttpError with status code 404 when the book to delete is not found", () => {
            expect(() => bookService.deleteByName("Non-existent Book")).to.throw(HttpError, /Book not found/);
        });
    });
});