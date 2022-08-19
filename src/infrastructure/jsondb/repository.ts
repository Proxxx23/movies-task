import fs from "fs";
import {MoviesRepository} from "../../application/jsondb/repository";
import {Movie} from "../../models/Movie";
import {DBMovie} from "../../models/DBMovie";

const DB_PATH = '/../../db/db.json'; // fixme: ???

type DB = {
    genres: string[],
    movies: DBMovie[],
}

export const createMoviesRepository = () => articleRepository(connection());

function articleRepository(db: DB): MoviesRepository {
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

    function find(): DBMovie {
        return db.movies[0];
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
        genres,
    };
}

function connection(): DB {
    let db: string;
    try {
        db = fs.readFileSync(__dirname + DB_PATH, {encoding: 'utf8'});
        return JSON.parse(db);
    } catch (err) {
        throw new Error('Could not connect to DB.' + err);
    }
}
