import {Request, Response} from "express";
import {createMoviesRepository} from "../infrastructure/jsondb/moviesRepository";
import {createGenresRepository} from "../infrastructure/jsondb/genresRepository";
import {MoviesService} from "../services/moviesService";
import {Movie} from "../models/Movie";
import {StatusCodes} from "http-status-codes";
import {DBMovie} from "../models/DBMovie";
import {createMovieFromRequest} from "../factories/movieFactory";

interface SearchQueryParams {
    genres?: string[],
    duration?: number,
}

export interface MovieRequest {
    title: string;
    year: number;
    runtime: number;
    director: string;
    genres: string[];
    actors: string | null;
    plot: string | null;
    posterUrl: string | null;
}

export const add = async (req: Request<{}, {}, MovieRequest>, res: Response): Promise<Response<Movie[] | string>> => {
    const genresRepository = createGenresRepository();
    const validGenres = await genresRepository.fetchAll();

    const allGenresValid = req.body.genres.every((genre) => validGenres.includes(genre));
    if (!allGenresValid) {
        return res.status(StatusCodes.UNPROCESSABLE_ENTITY).send('Invalid genre on a list!');
    }

    const movie = createMovieFromRequest(req.body);
    const moviesRepository = createMoviesRepository();

    try {
        await moviesRepository.add(movie);

        return res.send(
            {
                data: movie
            }
        );
    } catch (err) {
        if (err instanceof Error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err.message);
        }

        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Internal error - movie not added!');
    }
}

export const search = async (req: Request<{}, {}, {}, SearchQueryParams>, res: Response): Promise<Response<DBMovie[] | string>> => {
    const moviesService = new MoviesService(createMoviesRepository());

    const genres = Array.isArray(req.query.genres) ? req.query.genres : [req.query.genres];
    if (!req.query.genres || genres.length === 0) {
        return res.send(
            {
                data: await moviesService.getRandomMovie(req.query.duration)
            }
        );
    }

    return res.send(
        {
            data: await moviesService.find(genres, req.query.duration)
        }
    );

}
