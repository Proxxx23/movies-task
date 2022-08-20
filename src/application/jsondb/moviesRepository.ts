import {DBMovie} from "../../models/DBMovie";
import {Movie} from "../../models/Movie";

export interface MoviesRepository {
    add(movie: Movie): Promise<void>, // write model
    find(genresList?: string[], duration?: number): Promise<DBMovie[]>, // read model
    fetchRandom(): Promise<DBMovie>, // read model
    // todo: service should be responsible for randomizing movie
}
