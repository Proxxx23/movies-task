import {MoviesRepository} from "../../application/jsondb/moviesRepository";
import {Movie} from "../../models/Movie";
import {DBMovie} from "../../models/DBMovie";
import {MoviesDB, persist} from "./db";

export const createMoviesRepository = async (db: MoviesDB): Promise<MoviesRepository> => moviesRepository(db);

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
