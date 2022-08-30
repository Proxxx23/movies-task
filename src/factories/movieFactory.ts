import {MovieRequest} from "../controllers/moviesController";
import {Movie} from "../models/Movie";

export const createMovieFromRequest = (request: MovieRequest): Movie => {
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
