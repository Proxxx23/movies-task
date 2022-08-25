"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const supertest_1 = tslib_1.__importDefault(require("supertest"));
const http_status_codes_1 = require("http-status-codes");
const testServer_1 = require("../testServer");
describe('Tests for endpoint to search a movie', () => {
    const app = (0, testServer_1.createTestServer)();
    it('responds with a random movie for no query params specified', () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app)
            .get('/search')
            .send();
        const data = response.body.data;
        expect(response.status).toBe(http_status_codes_1.StatusCodes.OK);
        expect(data).toHaveProperty('id');
        expect(data).toHaveProperty('title');
        expect(data).toHaveProperty('runtime');
        expect(data).toHaveProperty('director');
        expect(data).toHaveProperty('genres');
        expect(data).toHaveProperty('actors');
        expect(data).toHaveProperty('plot');
        expect(data).toHaveProperty('posterUrl');
    }));
    it('responds with a random movie for only duration query param specified', () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app)
            .get('/search')
            .query({
            duration: 120
        })
            .send();
        const data = response.body.data;
        expect(response.status).toBe(http_status_codes_1.StatusCodes.OK);
        expect(data).toHaveProperty('id');
        expect(data).toHaveProperty('title');
        expect(data).toHaveProperty('runtime');
        expect(data).toHaveProperty('director');
        expect(data).toHaveProperty('genres');
        expect(data).toHaveProperty('actors');
        expect(data).toHaveProperty('plot');
        expect(data).toHaveProperty('posterUrl');
    }));
    it('responds with a movies for only array of genres query param specified', () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const genres = [
            'Comedy',
            'Adventure',
            'Animation'
        ];
        const response = yield (0, supertest_1.default)(app)
            .get('/search')
            .query({
            genres
        })
            .send();
        const data = response.body.data;
        const lastMovieOnAList = data[data.length - 1];
        const lastMovieMatchingGenresCount = lastMovieOnAList.genres.filter((genre) => genres.includes(genre)).length;
        expect(response.status).toBe(http_status_codes_1.StatusCodes.OK);
        expect(data.length).toBeGreaterThan(0); // theoretically this can be 0 if DB will be empty or duration assumption will fail
        expect(data[0].genres.length).toBe(3); // We assume we have movie with 3 genres that we've specified
        expect(lastMovieMatchingGenresCount).toBe(1); // We assume last movie has only one genre from given three
    }));
    it('responds with a movies for array of genres and duration query params specified', () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const genres = [
            'Comedy',
            'Adventure',
            'Animation'
        ];
        const response = yield (0, supertest_1.default)(app)
            .get('/search')
            .query({
            genres,
            duration: 120,
        })
            .send();
        const data = response.body.data;
        const lastMovieOnAList = data[data.length - 1];
        const lastMovieMatchingGenresCount = lastMovieOnAList.genres.filter((genre) => genres.includes(genre)).length;
        expect(response.status).toBe(http_status_codes_1.StatusCodes.OK);
        expect(data.length).toBeGreaterThan(0); // theoretically this can be 0 if DB will be empty or duration assumption will fail
        expect(data[0].genres.length).toBe(3); // We assume we have movie with 3 genres that we've specified and it's first on a list
        expect(lastMovieMatchingGenresCount).toBe(1); // We assume last movie has only one genre from given three
    }));
    it('responds with a bad request for genres specified as a comma-separated string', () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app)
            .get('/search')
            .query({
            genres: 'Comedy, Action',
        })
            .send();
        expect(response.status).toBe(http_status_codes_1.StatusCodes.BAD_REQUEST);
    }));
    it('responds with an empty data if genres string and duration specified but no movies found for this query', () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app)
            .get('/search')
            .query({
            genres: 'Comedy',
            duration: 350,
        })
            .send();
        expect(response.status).toBe(http_status_codes_1.StatusCodes.OK);
        expect(response.body.data).toStrictEqual([]);
    }));
});
//# sourceMappingURL=searchMovie.test.js.map