import {MoviesRepository} from "../../application/jsondb/moviesRepository";
import {Movie} from "../../models/Movie";
import {DBMovie} from "../../models/DBMovie";
// @ts-ignore
import {insert, all} from "../../../lib/database/src/jsondb";
import {MoviesSchema} from "../../application/jsondb/schema";

export const createMoviesRepository = async (): Promise<MoviesRepository> => moviesRepository();

const Table = 'movies';

function moviesRepository(): MoviesRepository {
    async function fetchAll(): Promise<DBMovie[]> {
        const database = await all<MoviesSchema>();

        return database[Table];
    }

    async function add(movie: Movie): Promise<void> {
        await insert(Table, movie);
    }

    return {
        fetchAll,
        add,
    };
}
