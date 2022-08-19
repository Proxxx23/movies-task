import {DBMovie} from "../../models/DBMovie";
import {Movie} from "../../models/Movie";

export interface MoviesRepository {
    addMovie(movie: Movie): void, // write model
    find(genresList?: string[], duration?: number): DBMovie[], // read model
    fetchRandom(): DBMovie, // read model
    genres(): string[];
}
