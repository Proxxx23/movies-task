import {GenresRepository} from "../../application/jsondb/genresRepository";
import {Genre, all} from "./db";

export const createGenresRepository = async (): Promise<GenresRepository> => genresRepository();

function genresRepository(): GenresRepository {
    async function fetchAll(): Promise<Genre[]> {
        const allRecords = await all();

        return allRecords.genres;
    }

    return {
        fetchAll,
    };
}
