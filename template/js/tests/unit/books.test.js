import { HttpError, HttpResponse } from "bootpress/types/index.js";
import { expect } from "chai";
import { BookServiceImpl } from "../../services/books/index.js";
// Convert lines above to import syntax

describe('BookService', () => {

    let bookService = new BookServiceImpl();

    describe('#findAllBooks()', () => {
        it('should return an array of books', () => {
            const books = bookService.findAllBooks();
            expect(books).to.be.an('array');
        });

        it('should return all books', () => {
            const expectedBooks = [
                { name: "Kaşağı", year: 1919 },
                { name: "Harry Potter", year: 1997 },
                { name: "Don Quixote", year: 1605 }
            ];
            const actualBooks = bookService.findAllBooks();
            expect(actualBooks).to.deep.equal(expectedBooks);
        });
    });

    describe('#findByYear(year)', () => {
        it('should throw an error if year is not parsable to an integer', () => {
            expect(() => {
                bookService.findByYear('invalid year');
            }).to.throw(HttpError);
        });

        it('should return an array of books in year', () => {
            const expectedBooks = [{ name: "Kaşağı", year: 1919 }];
            const actualBooks = bookService.findByYear(1919);
            expect(actualBooks).to.deep.equal(expectedBooks);
        });

        it('should throw a 404 error if no books found in year', () => {
            expect(() => {
                bookService.findByYear(2023);
            }).to.throw(HttpError, /Couldn't find a book in year 2023/);
        });
    });

    describe('#add(body)', () => {
        it('should add a book to the list of books', () => {
            const expectedBook = { name: "Test Book", year: 2023 };
            const actualResponse = bookService.add({ name: "Test Book" });
            expect(actualResponse).to.be.an.instanceOf(HttpResponse);
            expect(actualResponse.status).to.equal(201);
            expect(actualResponse.data).to.deep.equal(expectedBook);
        });

        it('should use default year if none provided', () => {
            const expectedBook = { name: "Test Book", year: 2023 };
            const actualResponse = bookService.add({ name: "Test Book" });
            expect(actualResponse.data).to.deep.equal(expectedBook);
        });

        it('should throw an error if body does not fit schema', () => {
            expect(() => {
                bookService.add({ invalidBody: true });
            }).to.throw(HttpError);
        });
    });

    describe('#deleteByName(name)', () => {
        it('should delete a book by name', () => {
            const expectedMessage = 'Deleted Kaşağı';
            const actualMessage = bookService.deleteByName('Kaşağı');
            expect(actualMessage).to.equal(expectedMessage);
        });

        it('should throw a 404 error if book not found', () => {
            expect(() => {
                bookService.deleteByName('Nonexistent Book');
            }).to.throw(HttpError, /Book not found/);
        });

        it('should throw a 400 error if name is not provided', () => {
            expect(() => {
                bookService.deleteByName();
            }).to.throw(HttpError, /Name is required/);
        });
    });
});
