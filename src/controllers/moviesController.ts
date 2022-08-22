import {Request, Response} from "express";
import {createMoviesRepository} from "../infrastructure/jsondb/moviesRepository";
import {createGenresRepository} from "../infrastructure/jsondb/genresRepository";
import {MovieService} from "../services/movieService";
import {Movie} from "../models/Movie";
import {StatusCodes} from "http-status-codes";
import {DBMovie} from "../models/DBMovie";
import {MoviesRepository} from "../application/jsondb/moviesRepository";
import {GenresRepository} from "../application/jsondb/genresRepository";

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
    let moviesRepository: MoviesRepository;
    let genresRepository: GenresRepository;
    try {
        moviesRepository = await createMoviesRepository();
        genresRepository = await createGenresRepository();
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Could not connect to a database!');
    }

    const validGenres = await genresRepository.all();
    const genres = req.body.genres;

    const allGenresValid = genres.every((genre) => validGenres.includes(genre));
    if (!allGenresValid) {
        return res.status(StatusCodes.UNPROCESSABLE_ENTITY).send('Invalid genre on a list!');
    }

    // todo???: May be put in a factory createFromRequest() method
    const movie: Movie = {
        id: null, // to be set by a DB
        title: req.body.title,
        year: req.body.year,
        runtime: req.body.runtime,
        director: req.body.director,
        genres: req.body.genres,
        actors: req.body.actors || null,
        plot: req.body.plot || null,
        posterUrl: req.body.posterUrl || null,
    }

    try {
        await moviesRepository.add(movie)
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Internal error - movie not added!');
    }

    return res.send(
        {
            data: movie
        }
    );
}

export const search = async (req: Request<{}, {}, {}, SearchQueryParams>, res: Response): Promise<Response<DBMovie[] | string>> => {
    let moviesRepository: MoviesRepository;
    let genresRepository: GenresRepository;
    try {
        moviesRepository = await createMoviesRepository();
        genresRepository = await createGenresRepository();
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Could not connect to a database!');
    }

    const moviesService = new MovieService(moviesRepository);

    const genres = Array.isArray(req.query.genres) ? req.query.genres : [req.query.genres];
    if (!req.query.genres || genres.length === 0) {
        return res.send(
            {
                data: await moviesService.getRandomMovie(req.query.duration)
            }
        );
    }

    // todo: put in a validator
    const allowedGenres = await genresRepository.all();

    const allGenresValid = genres.every((genre) => allowedGenres.includes(genre));
    if (!allGenresValid) {
        return res.status(StatusCodes.BAD_REQUEST).send('Invalid genre on a list!');
    }

    return res.send(
        {
            data: await moviesService.find(genres, req.query.duration)
        }
    );
}
