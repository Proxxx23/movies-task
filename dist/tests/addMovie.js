"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const supertest_1 = tslib_1.__importDefault(require("supertest"));
const http_status_codes_1 = require("http-status-codes");
const testServer_1 = require("../testServer");
const db_1 = require("../../lib/database/db");
const moviesRepository_1 = require("../infrastructure/jsondb/moviesRepository");
const fs_1 = tslib_1.__importDefault(require("fs"));
// Replicate original DB into test one after all the tests has finished
// We want to have clear DB (made of production one) before suite runs
afterAll((() => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    fs_1.default.copyFile(__dirname + '/../db/' + db_1.ORIG_DB_NAME, __dirname + '/../db/' + db_1.TEST_DB_NAME, (err) => {
        if (err) {
            console.error('Could not replicate test DB from original structure.');
            process.exit();
        }
    });
})));
describe('Endpoint to add a movie', () => {
    const app = (0, testServer_1.createTestServer)();
    it('responds with 422 code for invalid movie genre', () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).post('/add').send({
            title: 'Test Title',
            year: 2022,
            runtime: 1600,
            director: 'Test Director',
            genres: ['Invalid Genre']
        });
        expect(response.status).toBe(http_status_codes_1.StatusCodes.UNPROCESSABLE_ENTITY);
    }));
    it('adds movie to database properly for valid data provided', () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const movie = {
            actors: 'Some Actors',
            director: 'Test Director',
            genres: ['Comedy'],
            title: 'Test Title',
            year: 2022,
            runtime: 1600,
            plot: 'Any Plot',
            posterUrl: 'http://poster.url',
        };
        const response = yield (0, supertest_1.default)(app)
            .post('/add')
            .send(movie);
        const dbMovie = Object.assign({ id: 1 }, movie);
        expect(response.status).toBe(http_status_codes_1.StatusCodes.OK);
        expect(response.body).toStrictEqual({
            data: dbMovie
        });
        const moviesRepository = yield (0, moviesRepository_1.createMoviesRepository)();
        const movies = yield moviesRepository.fetchAll();
        const addedMovie = movies[movies.length - 1];
        expect(addedMovie).toStrictEqual(dbMovie);
    }));
});
//# sourceMappingURL=addMovie.js.map