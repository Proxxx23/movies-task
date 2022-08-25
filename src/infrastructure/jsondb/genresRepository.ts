import {GenresRepository} from "../../application/jsondb/genresRepository";
import {all} from "../../../lib/database/src/db";
import {Genre, MoviesSchema} from "../../application/jsondb/schema";

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
