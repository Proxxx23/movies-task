import {MovieRequest} from "../controllers/moviesController";
import {Movie} from "../models/Movie";

export const createMovieEntityFromRequest = async (request: MovieRequest): Promise<Movie> => {
    return {
        id: null, // to be set by a DB
        title: request.title,
        year: request.year,
        runtime: request.runtime,
        director: request.director,
        genres: request.genres,
        actors: request.actors || null,
        plot: request.plot || null,
        posterUrl: request.posterUrl || null,
    }
}
