import {DBMovie} from "../../models/DBMovie";
import {Movie} from "../../models/Movie";

export interface MoviesRepository {
    all(): Promise<DBMovie[]>,
    add(movie: Movie): Promise<void>,
}
