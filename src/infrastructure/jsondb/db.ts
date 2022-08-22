import fsPromised from "fs/promises";
import {DBMovie} from "../../models/DBMovie";

export const PROD_DB_NAME = 'db.json';
export const ORIG_DB_NAME = 'db-orig.json';
export const TEST_DB_NAME = 'db-test.json';

export const PROD_DB_PATH = '/../../db/' + PROD_DB_NAME;
export const TEST_DB_PATH = '/../../db/' + TEST_DB_NAME;

export type MoviesDB = {
    genres: string[],
    movies: DBMovie[],
}

export const connection = async (): Promise<MoviesDB> => {
    const dbPath = process.env.NODE_ENV === 'production'
        ? PROD_DB_PATH
        : TEST_DB_PATH;

    const data = await fsPromised.readFile(__dirname + dbPath, {encoding: 'utf8'});
    const buff = Buffer.from(data);

    return JSON.parse(buff.toString()) as MoviesDB;
}

export const lastInsertedId = async (): Promise<number> => {
    const db = await connection();

    let lastId = db.movies[db.movies.length-1].id;

    return ++lastId;
}
