import {Request, Response} from "express";
import {createMoviesRepository} from "../infrastructure/jsondb/moviesRepository";
import {createGenresRepository} from "../infrastructure/jsondb/genresRepository";
import {MovieService} from "../services/movieService";
import {Movie} from "../models/Movie";
import {StatusCodes} from "http-status-codes";
import {DBMovie} from "../models/DBMovie";
import {connection, MoviesDB} from "../infrastructure/jsondb/db";

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
    let db: MoviesDB;
    try {
        db = await connection();
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Could not connect to database!');
    }

    const moviesRepository = await createMoviesRepository(db);
    const genresRepository = await createGenresRepository(db);
    const validGenres = await genresRepository.all();
    const genres = req.body.genres;

    const allGenresValid = genres.every((genre) => validGenres.includes(genre));
    if (!allGenresValid) {
        return res.status(StatusCodes.UNPROCESSABLE_ENTITY).send('Invalid genre on a list!');
    }

    // todo???: May be put in a factory createFromRequest() method
    const movie: Movie = {
        id: 0,
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
    let db: MoviesDB;
    try {
        db = await connection();
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Could not connect to database!');
    }

    const moviesRepository = await createMoviesRepository(db);
    const genresRepository = await createGenresRepository(db);
    const moviesService = new MovieService(moviesRepository);

    const genres = Array.isArray(req.query.genres) ? req.query.genres : [req.query.genres];
    if (!req.query.genres || genres.length === 0) {
        return res.send(
            {
                data: await moviesService.getRandomMovie(req.query.duration)
            }
        );
    }

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
