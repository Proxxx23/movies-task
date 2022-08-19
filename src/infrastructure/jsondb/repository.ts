import fs from "fs";
import {MoviesRepository} from "../../application/jsondb/repository";
import {Movie} from "../../models/Movie";
import {DBMovie} from "../../models/DBMovie";

const DB_PATH = ''; // todo: ???

type DB = {
    genres: string[],
    movies: DBMovie[],
}

export const createMoviesRepository = () => articleRepository(connection());

function articleRepository(db: DB): MoviesRepository {
    function addMovie(movie: Movie): void {
        movie.id = getIncrementedId();
        db.movies[movie.id] = movie;
        fs.writeFileSync(__dirname + '/../../db/db.json', JSON.stringify(db.movies.filter((x) => x !== null))); // fixme: why do we have null value here?
    }

    function find(): DBMovie {
        return db.movies[0];
    }

    function genres(): string[]
    {
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
        db = fs.readFileSync(__dirname + '/../../db/db.json', {encoding: 'utf8'});
        return JSON.parse(db);
    } catch (err) {
        throw new Error('Could not connect to DB.' + err);
    }
}
