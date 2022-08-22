import {Request, Response} from "express";
import {createMoviesRepository} from "../infrastructure/jsondb/moviesRepository";
import {createGenresRepository} from "../infrastructure/jsondb/genresRepository";
import {MoviesService} from "../services/moviesService";
import {Movie} from "../models/Movie";
import {StatusCodes} from "http-status-codes";
import {DBMovie} from "../models/DBMovie";
import {createMovieEntityFromRequest} from "../factories/movieFactory";

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
    const moviesRepository = await createMoviesRepository();
    const genresRepository = await createGenresRepository();

    try {
        const validGenres = await genresRepository.fetchAll();

        const allGenresValid = req.body.genres.every((genre) => validGenres.includes(genre));
        if (!allGenresValid) {
            return res.status(StatusCodes.UNPROCESSABLE_ENTITY).send('Invalid genre on a list!');
        }

        const movie = await createMovieEntityFromRequest(req.body);

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
    const moviesService = new MoviesService(await createMoviesRepository());

    try {
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
    } catch (err) {
        if (err instanceof Error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err.message);
        }

        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Internal error - could not perform search!');
    }
}
