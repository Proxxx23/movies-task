import app from "../index";
import request from "supertest";
import {StatusCodes} from "http-status-codes";

describe('Testing POSTS/shots endpoint', () => {
    it('respond with valid HTTP status code and description and message', async () => {
        // Make POST Request
        const response = await request(app).get('/').send();

        expect(response.status).toBe(StatusCodes.OK);
    });
});
