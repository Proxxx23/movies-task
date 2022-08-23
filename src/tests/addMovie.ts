import request from "supertest";
import {StatusCodes} from "http-status-codes";
import {createTestServer} from "../testServer";
import {all, lastInsertedId, ORIG_DB_NAME, TEST_DB_NAME} from "../../lib/database/db";
import {createMoviesRepository} from "../infrastructure/jsondb/moviesRepository";
import fs from "fs";
import {MoviesSchema} from "../db/schema";

// Replicate original DB into test one after all the tests has finished
// We want to have clear DB (made of production one) before suite runs
afterAll((async () => {
    fs.copyFile(__dirname + '/../db/' + ORIG_DB_NAME, __dirname + '/../db/' + TEST_DB_NAME, (err) => {
        if (err) {
            console.error('Could not replicate test DB from original structure.');
            process.exit();
        }
    })
}))

describe('Endpoint to add a movie', () => {
    const app = createTestServer();

    it('responds with 422 code for invalid movie genre', async () => {
        const response = await request(app).post('/add').send(
            {
                title: 'Test Title',
                year: 2022,
                runtime: 1600,
                director: 'Test Director',
                genres: ['Invalid Genre']
            }
        );

        expect(response.status).toBe(StatusCodes.UNPROCESSABLE_ENTITY);
    });

    it('adds movie to database properly for valid data provided', async () => {
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

        const response = await request(app)
            .post('/add')
            .send(movie);

        const db = await all<MoviesSchema>();
        const lastId = await lastInsertedId(db.movies);

        const dbMovie = {
            id: lastId - 1,
            ...movie
        };

        expect(response.status).toBe(StatusCodes.OK);
        expect(response.body).toStrictEqual(
            {
                data: dbMovie
            }
        );

        const moviesRepository = await createMoviesRepository();
        const movies = await moviesRepository.fetchAll();

        const addedMovie = movies[movies.length - 1];

        expect(addedMovie).toStrictEqual(dbMovie);
    });
});
