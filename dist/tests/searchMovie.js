"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const supertest_1 = tslib_1.__importDefault(require("supertest"));
const http_status_codes_1 = require("http-status-codes");
const testServer_1 = require("./testServer");
describe('Tests for endpoint to search a movie', () => {
    const app = (0, testServer_1.createTestServer)();
    it('responds with a random movie for no query params specified', () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app)
            .get('/search')
            .send();
        expect(response.status).toBe(http_status_codes_1.StatusCodes.OK);
        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('title');
        expect(response.body).toHaveProperty('runtime');
        expect(response.body).toHaveProperty('director');
        expect(response.body).toHaveProperty('genres');
        expect(response.body).toHaveProperty('actors');
        expect(response.body).toHaveProperty('plot');
        expect(response.body).toHaveProperty('posterUrl');
    }));
    it('responds with a random movie for duration specified', () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app)
            .get('/search')
            .query({
            duration: 120
        })
            .send();
        expect(response.status).toBe(http_status_codes_1.StatusCodes.OK);
        expect(response.body.length).toBeGreaterThan(0); // theoretically this can be 0 if DB will be empty or duration assumption will fail
    }));
    it('responds with a movies for only genres query param specified', () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app)
            .get('/search')
            .query({
            genres: [
                'Comedy',
                'Adventure',
                'Animation'
            ]
        })
            .send();
        expect(response.status).toBe(http_status_codes_1.StatusCodes.OK);
        expect(response.body.length).toBeGreaterThan(0); // theoretically this can be 0 if DB will be empty or duration assumption will fail
        expect(response.body[0].genres.length).toBe(3); // We assume we have movie with 3 genres that we've specified
        expect(response.body[response.body.length - 1].genres.length).toBe(1); // We assume last movie has only one genre from given three
    }));
    it('responds with a movies for genres and duration query params specified', () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app)
            .get('/search')
            .query({
            genres: [
                'Comedy',
                'Adventure',
                'Animation'
            ],
            duration: 120,
        })
            .send();
        expect(response.status).toBe(http_status_codes_1.StatusCodes.OK);
        expect(response.body.length).toBeGreaterThan(0); // theoretically this can be 0 if DB will be empty or duration assumption will fail
        expect(response.body[0].genres.length).toBe(3); // We assume we have movie with 3 genres that we've specified
        expect(response.body[response.body.length - 1].genres.length).toBe(1); // We assume last movie has only one genre from given three
    }));
    it('responds with an empty data if genres and duration specified but no movies found for this query', () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app)
            .get('/search')
            .query({
            genres: [
                'Comedy',
            ],
            duration: 350,
        })
            .send();
        expect(response.status).toBe(http_status_codes_1.StatusCodes.OK);
        expect(response.body.length).toBe(0);
    }));
});
//# sourceMappingURL=searchMovie.js.map