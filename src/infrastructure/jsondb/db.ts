import fsPromised from "fs/promises";
import {DBMovie} from "../../models/DBMovie";

export const DB_PATH = '/../../db/db.json'; // fixme: ???

export type MoviesDB = {
    genres: string[],
    movies: DBMovie[],
}

export const connection = async (): Promise<MoviesDB> => {
    try {
        const data = await fsPromised.readFile(__dirname + DB_PATH, {encoding: 'utf8'});
        const buff = Buffer.from(data);

        return JSON.parse(buff.toString()) as MoviesDB;
    } catch (err) {
        // fixme doesn't work!!!
        throw new Error('Could not connect to database.');
    }
}

export const lastInsertedId = async (): Promise<number> => {
    const db = await connection();

    let lastId = db.movies[db.movies.length-1].id;

    return ++lastId;
}
