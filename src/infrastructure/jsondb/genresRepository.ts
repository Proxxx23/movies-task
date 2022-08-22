import {GenresRepository} from "../../application/jsondb/genresRepository";
import type {MoviesDB} from "./db";

export const createGenresRepository = async (db: MoviesDB): Promise<GenresRepository> => genresRepository(db);

function genresRepository(db: MoviesDB): GenresRepository {
    async function all(): Promise<MoviesDB['genres']> {
        return db.genres;
    }

    return {
        all,
    };
}
