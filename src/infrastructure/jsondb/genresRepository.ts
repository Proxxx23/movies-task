import {GenresRepository} from "../../application/jsondb/genresRepository";
import type {MoviesDB} from "./db";
import {connection} from "./db";

export const createGenresRepository = async (): Promise<GenresRepository> => genresRepository(await connection());

function genresRepository(db: MoviesDB): GenresRepository {
    async function all(): Promise<MoviesDB['genres']> {
        return db.genres;
    }

    return {
        all,
    };
}
