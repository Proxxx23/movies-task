import {MovieRequest} from "../controllers/moviesController";
import {Movie} from "../models/Movie";

export const createMovieEntityFromRequest = async (request: MovieRequest): Promise<Movie> => {
    return new Movie(
        null, // set by a DB
        request.title,
        request.year,
        request.runtime,
        request.director,
        request.genres,
        request.actors || null,
        request.plot || null,
        request.posterUrl || null,
    )
}
