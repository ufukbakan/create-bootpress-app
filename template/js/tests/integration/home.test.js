import { expect } from 'chai';
import request from 'supertest';
import app from '../../index.js';

describe('GET /', () => {
    it('should respond with "hello world"', async () => {
        const response = await request(app).get('/');
        expect(response.status).to.equal(200);
        expect(response.text).to.equal('hello world');
    });
});