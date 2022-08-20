import fs from "fs";
import {MoviesRepository} from "../../application/jsondb/moviesRepository";
import {Movie} from "../../models/Movie";
import {DBMovie} from "../../models/DBMovie";
import {connection, DB_PATH, DBTable} from "./db";

export const createMoviesRepository = async (): Promise<MoviesRepository> => moviesRepository(await connection());

function moviesRepository(db: DBTable): MoviesRepository {
    async function add(movie: Movie): Promise<void> {
        movie.id = await getIncrementedId();
        db.movies[movie.id] = movie;

        // todo: async
        fs.writeFileSync(__dirname + DB_PATH, JSON.stringify(
            {
                genres: db.genres,
                movies: db.movies.filter((x) => x !== null) // fixme: why do we have null value here and how to filter it out?
            }
        ));
    }

    async function fetchRandom(): Promise<DBMovie> {
        return db.movies[Math.floor((Math.random() * db.movies.length))];
    }

    async function find(genresList?: string[], duration?: number): Promise<DBMovie[]> {
        if (genresList) {
            db.movies.forEach((movie) => {
                const hasNoMatchingGenres = movie.genres.filter((genre) => genresList.includes(genre)) === [];
                if (hasNoMatchingGenres) {
                    return;
                }
            });
        }

        if (duration) {
            db.movies.filter((movie) => movie.runtime > duration - 10 && movie.runtime < duration + 10);
        }

        return db.movies;
    }

    async function getIncrementedId(): Promise<number> {
        let lastId =  db.movies[db.movies.length-1].id;

        return ++lastId;
    }

    return {
        add,
        find,
        fetchRandom,
    };
}
