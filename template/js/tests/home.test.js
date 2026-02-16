import request from 'supertest';
import { describe, expect, it } from 'vitest';
import app from '../';

describe('GET /', () => {
    it('should respond with "hello world"', async () => {
        const response = await request(app).get('/');
        expect(response.status).toBe(200);
        expect(response.text).toBe('hello world');
    });
});