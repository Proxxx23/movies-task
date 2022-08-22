import fs from "fs/promises";
import {MoviesRepository} from "../../application/jsondb/moviesRepository";
import {Movie} from "../../models/Movie";
import {DBMovie} from "../../models/DBMovie";
import {PROD_DB_PATH, MoviesDB, lastInsertedId, TEST_DB_PATH} from "./db";

export const createMoviesRepository = async (db: MoviesDB): Promise<MoviesRepository> => moviesRepository(db);

function moviesRepository(db: MoviesDB): MoviesRepository {
    async function all(): Promise<DBMovie[]> {
        return db.movies;
    }

    async function add(movie: Movie): Promise<void> {
        movie.id = await lastInsertedId();
        db.movies[movie.id] = movie;

        const dbPath = process.env.NODE_ENV === 'production'
            ? PROD_DB_PATH
            : TEST_DB_PATH;

        await fs.writeFile(__dirname + dbPath, JSON.stringify(
            {
                genres: db.genres,
                movies: db.movies.filter((x) => x !== null && x !== undefined)
            }
        ));
    }

    return {
        all,
        add,
    };
}
