import {GenresRepository} from "../../application/jsondb/genresRepository";
import type {Genre, MoviesTable} from "./db";
import {connection} from "./db";

export const createGenresRepository = async (): Promise<GenresRepository> => genresRepository(await connection());

function genresRepository(db: MoviesTable): GenresRepository {
    async function all(): Promise<Genre[]> {
        return db.genres;
    }

    return {
        all,
    };
}
