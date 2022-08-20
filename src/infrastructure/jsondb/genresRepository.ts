import {DBMovie} from "../../models/DBMovie";
import {GenresRepository} from "../../application/jsondb/genresRepository";
import {connection, DBTable} from "./db";

export const createGenresRepository = async (): Promise<GenresRepository> => genresRepository(await connection());

function genresRepository(db: DBTable): GenresRepository {
    async function all(): Promise<DBMovie['genres']> {
        return db.genres;
    }

    return {
        all,
    };
}
