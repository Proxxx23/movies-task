import {MoviesRepository} from "../../application/jsondb/moviesRepository";
import {Movie} from "../../models/Movie";
import {DBMovie} from "../../models/DBMovie";
import {persist, all} from "./db";

export const createMoviesRepository = async (): Promise<MoviesRepository> => moviesRepository();

function moviesRepository(): MoviesRepository {
    async function fetchAll(): Promise<DBMovie[]> {
        const allRecords = await all();

        return allRecords.movies;
    }

    async function add(movie: Movie): Promise<void> {
        await persist(movie);
    }

    return {
        fetchAll,
        add,
    };
}
