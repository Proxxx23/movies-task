import {MoviesRepository} from "../../application/jsondb/moviesRepository";
import {Movie} from "../../models/Movie";
import {DBMovie} from "../../models/DBMovie";
import {connection, MoviesTable, persist} from "./db";

export const createMoviesRepository = async (): Promise<MoviesRepository> => moviesRepository(await connection());

function moviesRepository(db: MoviesTable): MoviesRepository {
    async function all(): Promise<DBMovie[]> {
        // todo: like persist, something like all() in DB
        return db.movies;
    }

    async function add(movie: Movie): Promise<void> {
        await persist(movie);
    }

    return {
        all,
        add,
    };
}
