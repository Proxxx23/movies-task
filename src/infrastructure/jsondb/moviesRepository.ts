import {MoviesRepository} from "../../application/jsondb/moviesRepository";
import {Movie} from "../../models/Movie";
import {DBMovie} from "../../models/DBMovie";
// @ts-ignore
import {insert, all} from "../../../lib/database/db";
import {MoviesSchema} from "../../db/schema";

export const createMoviesRepository = async (): Promise<MoviesRepository> => moviesRepository();

const Table = 'movies';

function moviesRepository(): MoviesRepository {
    async function fetchAll(): Promise<DBMovie[]> {
        const allRecords = await all<MoviesSchema>();

        return allRecords.movies;
    }

    async function add(movie: Movie): Promise<void> {
        await insert<MoviesSchema>(Table, movie);
    }

    return {
        fetchAll,
        add,
    };
}
