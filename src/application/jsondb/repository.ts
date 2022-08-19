import {DBMovie} from "../../models/DBMovie";
import {Movie} from "../../models/Movie";

export interface MoviesRepository {
    addMovie(movie: Movie): void, // write model
    find(params: any): DBMovie, // read model
    genres(): string[];
}
