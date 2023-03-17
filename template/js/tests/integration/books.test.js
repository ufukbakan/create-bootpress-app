import request from 'supertest';
import app from '../../index.js';
import { expect } from 'chai';

describe('GET /books', () => {
    it('should respond with an array of books', async () => {
        const response = await request(app).get('/books');
        expect(response.status).to.equal(200);
        expect(response.body).to.be.an('array');
    });
});

describe('GET /books/:year', () => {
    it('should respond with an array of books released in a specified year', async () => {
        const response = await request(app).get('/books/1997');
        expect(response.status).to.equal(200);
        expect(response.body).to.be.an('array');
        expect(response.body[0].name).to.equal('Harry Potter');
        expect(response.body[0].year).to.equal(1997);
    });

    it('should respond with a 404 error if there are no books released in the specified year', async () => {
        const response = await request(app).get('/books/2025');
        expect(response.status).to.equal(404);
    });

    it('should respond with a 400 error if year is not a number', async () => {
        const response = await request(app).get('/books/not-a-number');
        expect(response.status).to.equal(400);
    });
});

describe('POST /books', () => {
    it('should add a new book to the list', async () => {
        const response = await request(app)
            .post('/books')
            .send({ name: 'Test Book', year: 2022 });
        expect(response.status).to.equal(201);
        expect(response.body).to.be.an('object');
        expect(response.body.name).to.equal('Test Book');
        expect(response.body.year).to.equal(2022);
    });

    it('should add a default year of 2023 if none is provided', async () => {
        const response = await request(app)
            .post('/books')
            .send({ name: 'Test Book' });
        expect(response.status).to.equal(201);
        expect(response.body).to.be.an('object');
        expect(response.body.name).to.equal('Test Book');
        expect(response.body.year).to.equal(2023);
    });

    it('should respond with a 400 error if name is missing', async () => {
        const response = await request(app)
            .post('/books')
            .send({ year: 2022 });
        expect(response.status).to.equal(400);
    });

    it('should respond with a 400 error if year is not a number', async () => {
        const response = await request(app)
            .post('/books')
            .send({ name: 'Test Book', year: 'not-a-number' });
        expect(response.status).to.equal(400);
    });
});

describe('DELETE /books', () => {
    it('should delete a book by name', async () => {
        const response = await request(app)
            .delete('/books')
            .query({ name: 'Test Book' });
        expect(response.status).to.equal(200);
        expect(response.text).to.equal('Deleted Test Book');
    });

    it('should respond with a 404 error if book is not found', async () => {
        const response = await request(app)
            .delete('/books')
            .query({ name: 'Nonexistent Book' });
        expect(response.status).to.equal(404);
    });

    it('should respond with a 400 error if name is missing', async () => {
        const response = await request(app).delete('/books');
        expect(response.status).to.equal(400);
    });
});
