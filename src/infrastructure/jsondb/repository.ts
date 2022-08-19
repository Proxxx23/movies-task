import fs from "fs";
import {MoviesRepository} from "../../application/jsondb/repository";
import {Movie} from "../../models/Movie";
import {DBMovie} from "../../models/DBMovie";

const DB_PATH = '/../../db/db.json'; // fixme: ???

type DBTable = {
    genres: string[],
    movies: DBMovie[],
}

export const createMoviesRepository = (): MoviesRepository => articleRepository(connection());

function articleRepository(db: DBTable): MoviesRepository {
    function addMovie(movie: Movie): void {
        movie.id = getIncrementedId();
        db.movies[movie.id] = movie;

        fs.writeFileSync(__dirname + DB_PATH, JSON.stringify(
            {
                genres: db.genres,
                movies: db.movies.filter((x) => x !== null) // fixme: why do we have null value here and how to filter it out?
            }
        ));
    }

    function fetchRandom(): DBMovie {
        return db.movies[Math.floor((Math.random() * db.movies.length))];
    }

    function find(genresList?: string[], duration?: number): DBMovie[] {
        if (genresList) {
            db.movies.forEach((movie) => {
                const hasNoMatchingGenres = movie.genres.filter((genre) => genresList.includes(genre)) === [];
                if (hasNoMatchingGenres) {
                    delete movie;
                }
            });
        }

        if (duration) {
            db.movies.filter((movie) => movie.runtime > duration - 10 && movie.runtime < duration + 10);
        }

        return db.movies;
    }

    function genres(): DBMovie['genres'] {
        return db.genres;
    }

    function getIncrementedId(): number {
        let lastId =  db.movies[db.movies.length-1].id;

        return ++lastId;
    }

    return {
        addMovie,
        find,
        fetchRandom,
        genres,
    };
}

function connection(): DBTable {
    let db: string;
    try {
        db = fs.readFileSync(__dirname + DB_PATH, {encoding: 'utf8'});
        return JSON.parse(db);
    } catch (err) {
        throw new Error('Could not connect to DB. ' + err);
    }
}
