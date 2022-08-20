import fsPromised from "fs/promises";
import fs from "fs";
import {MoviesRepository} from "../../application/jsondb/repository";
import {Movie} from "../../models/Movie";
import {DBMovie} from "../../models/DBMovie";

const DB_PATH = '/../../db/db.json'; // fixme: ???

type DBTable = {
    genres: string[],
    movies: DBMovie[],
}

export const createMoviesRepository = async (): Promise<MoviesRepository> => articleRepository(await connection());

function articleRepository(db: DBTable): MoviesRepository {
    async function add(movie: Movie): Promise<void> {
        movie.id = await getIncrementedId();
        db.movies[movie.id] = movie;

        // todo: async?
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

    async function genres(): Promise<DBMovie['genres']> {
        return db.genres;
    }

    async function getIncrementedId(): Promise<number> {
        let lastId =  db.movies[db.movies.length-1].id;

        return ++lastId;
    }

    return {
        add,
        find,
        fetchRandom,
        genres,
    };
}

// todo: standalone infra, decouple from repo
const connection = async (): Promise<DBTable> => {
    try {
        const data = await fsPromised.readFile(__dirname + DB_PATH, {encoding: 'utf8'});
        const buff = Buffer.from(data);

        return JSON.parse(buff.toString()) as DBTable;
    } catch (err) {
        //
    }
}
