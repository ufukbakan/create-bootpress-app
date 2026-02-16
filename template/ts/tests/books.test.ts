import request from 'supertest';
import { describe, expect, it } from 'vitest';
import app from '../';

describe('Books API', async () => {

    describe('GET /books', () => {
        it('should respond with an array of books', async () => {
            const response = await request(app).get('/books');
            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
        });
    });

    describe('GET /books/:year', () => {
        it('should respond with an array of books released in a specified year', async () => {
            const response = await request(app).get('/books/1997');
            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
            expect(response.body[0].name).toBe('Harry Potter');
            expect(response.body[0].year).toBe(1997);
        });

        it('should respond with a 404 error if there are no books released in the specified year', async () => {
            const response = await request(app).get('/books/2025');
            expect(response.status).toBe(404);
        });

        it('should respond with a 400 error if year is not a number', async () => {
            const response = await request(app).get('/books/not-a-number');
            expect(response.status).toBe(400);
        });
    });

    describe('POST /books', () => {
        it('should add a new book to the list', async () => {
            const response = await request(app)
                .post('/books')
                .send({ name: 'Test Book', year: 2022 });
            expect(response.status).toBe(201);
            expect(typeof response.body === 'object' && response.body !== null).toBe(true);
            expect(response.body.name).toBe('Test Book');
            expect(response.body.year).toBe(2022);
        });

        it('should add a default year if none is provided', async () => {
            const response = await request(app)
                .post('/books')
                .send({ name: 'Test Book' });
            expect(response.status).toBe(201);
            expect(typeof response.body === 'object' && response.body !== null).toBe(true);
            expect(response.body.name).toBe('Test Book');
            expect(response.body.year).toBe(new Date().getFullYear());
        });

        it('should respond with a 400 error if name is missing', async () => {
            const response = await request(app)
                .post('/books')
                .send({ year: 2022 });
            expect(response.status).toBe(400);
        });

        it('should respond with a 400 error if year is not a number', async () => {
            const response = await request(app)
                .post('/books')
                .send({ name: 'Test Book', year: 'not-a-number' });
            expect(response.status).toBe(400);
        });
    });

    describe('DELETE /books', () => {
        it('should delete a book by name', async () => {
            const response = await request(app)
                .delete('/books')
                .query({ name: 'Test Book' });
            expect(response.status).toBe(200);
            expect(response.text).toBe('Deleted Test Book');
        });

        it('should respond with a 404 error if book is not found', async () => {
            const response = await request(app)
                .delete('/books')
                .query({ name: 'Nonexistent Book' });
            expect(response.status).toBe(404);
        });

        it('should respond with a 400 error if name is missing', async () => {
            const response = await request(app).delete('/books');
            expect(response.status).toBe(400);
        });
    });

})