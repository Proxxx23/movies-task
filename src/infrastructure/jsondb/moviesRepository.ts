import {MoviesRepository} from "../../application/jsondb/moviesRepository";
import {Movie} from "../../models/Movie";
import {DBMovie} from "../../models/DBMovie";
import {connection, MoviesDB, persist} from "./db";

export const createMoviesRepository = async (): Promise<MoviesRepository> => moviesRepository(await connection());

function moviesRepository(db: MoviesDB): MoviesRepository {
    async function all(): Promise<DBMovie[]> {
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
