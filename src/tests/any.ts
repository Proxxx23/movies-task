import app from "../index";
import request from "supertest";

describe('Testing POSTS/shots endpoint', () => {
    it('respond with valid HTTP status code and description and message', async () => {
        // Make POST Request
        const response = await request(app).get('/').send();

        console.log(response);
    });
});
