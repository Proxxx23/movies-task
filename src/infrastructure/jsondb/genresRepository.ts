import {GenresRepository} from "../../application/jsondb/genresRepository";
import {all} from "../../../lib/database/db";
import {Genre, MoviesSchema} from "../../db/schema";

const Table = 'genres';

export const createGenresRepository = async (): Promise<GenresRepository> => genresRepository();

function genresRepository(): GenresRepository {
    async function fetchAll(): Promise<Genre[]> {
        const database = await all<MoviesSchema>()

        return database[Table];
    }

    return {
        fetchAll,
    };
}
