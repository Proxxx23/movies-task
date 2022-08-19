import {Request, Response} from "express";
import {createMoviesRepository} from "../infrastructure/jsondb/repository";
import {Movie} from "../models/Movie";
import {StatusCodes} from "http-status-codes";

export const addMovie = (req: Request<Movie>, res: Response) => {
    const repository = createMoviesRepository();
    const validGenres = repository.genres();
    const genres = req.body.genres as string[];

    const allGenresValid = genres.every((genre) => validGenres.includes(genre));
    if (!allGenresValid) {
        res.status(StatusCodes.BAD_REQUEST).send('Invalid genre on a list');
    }

    // todo: factory
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
        repository.addMovie(movie)
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Internal error - movie not added').end();
    }

    res.status(StatusCodes.OK).send('Movie added successfully');
}
