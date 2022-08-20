import fsPromised from "fs/promises";
import {DBMovie} from "../../models/DBMovie";

export const DB_PATH = '/../../db/db.json'; // fixme: ???

export type DBTable = {
    genres: string[],
    movies: DBMovie[],
}

export const connection = async (): Promise<DBTable> => {
    try {
        const data = await fsPromised.readFile(__dirname + DB_PATH, {encoding: 'utf8'});
        const buff = Buffer.from(data);

        return JSON.parse(buff.toString()) as DBTable;
    } catch (err) {
        //
    }
}