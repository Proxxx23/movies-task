import promisedFs from "fs/promises";
import {DBMovie} from "../../models/DBMovie";
import {Movie} from "../../models/Movie";

export const PROD_DB_NAME = 'db.json';
export const ORIG_DB_NAME = 'db-orig.json';
export const TEST_DB_NAME = 'db-test.json';

export const PROD_DB_PATH = '/../../db/' + PROD_DB_NAME;
export const TEST_DB_PATH = '/../../db/' + TEST_DB_NAME;

export type Genre = string;

// schema
export type MoviesTable = {
    genres: Genre[],
    movies: DBMovie[],
}

// In real DB this connection will be open and shared but let's leave it for now
const connection = async (): Promise<MoviesTable> => {
    const data = await promisedFs.readFile(await dbPath(), {encoding: 'utf8'});
    const buffer = Buffer.from(data);

    return JSON.parse(buffer.toString()) as MoviesTable;
}

export const all = async (): Promise<MoviesTable> => {
    return await connection();
}

export const persist = async (movie: Movie): Promise<number> => {
    const db = await connection();

    movie.id = await lastInsertedId();
    db.movies[movie.id] = movie;

    const moviesTable: MoviesTable = {
        genres: db.genres,
        movies: db.movies.filter((x) => x !== null && x !== undefined)
    };

    await promisedFs.writeFile(await dbPath(), JSON.stringify(moviesTable));

    return await lastInsertedId();
}

export const lastInsertedId = async (): Promise<number> => {
    const db = await connection();

    return ++db.movies[db.movies.length - 1].id;
}

const dbPath = async (): Promise<string> => {

    let path: string;
    switch (process.env.NODE_ENV) {
        case 'production':
            path = PROD_DB_PATH;
            break;
        case 'test':
            path = TEST_DB_PATH;
            break;
        default:
            throw new Error('Could not connect to a database: invalid environment');
    }

    try {
        await promisedFs.access(__dirname + path);
    } catch (err) {
        throw new Error('Could not connect to a database: no database found');
    }

    return __dirname + path;
}

