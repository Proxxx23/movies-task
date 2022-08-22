import fs from "fs/promises";
import {MoviesRepository} from "../../application/jsondb/moviesRepository";
import {Movie} from "../../models/Movie";
import {DBMovie} from "../../models/DBMovie";
import {connection, DB_PATH, MoviesDB, lastInsertedId} from "./db";

export const createMoviesRepository = async (): Promise<MoviesRepository> => moviesRepository(await connection());

function moviesRepository(db: MoviesDB): MoviesRepository {
    async function all(): Promise<DBMovie[]> {
        return db.movies;
    }

    async function add(movie: Movie): Promise<void> {
        movie.id = await lastInsertedId();
        db.movies[movie.id] = movie;

        await fs.writeFile(__dirname + DB_PATH, JSON.stringify(
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
