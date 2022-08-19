import {Request, Response} from "express";
import {createMoviesRepository} from "../infrastructure/jsondb/repository";
import {Movie} from "../models/Movie";
import {StatusCodes} from "http-status-codes";

export const addMovie = (req: Request<Movie>, res: Response) => {
    const repository = createMoviesRepository();

    const movie: Movie = {
        id: 0,
        title: req.body.title,
        year: req.body.year, // required
        runtime: req.body.runtime, // required
        director: req.body.director, // required
        genres: req.body.genres, // required, from DB only (predefined)
        actors: req.body.actors || null,
        plot: req.body.plot || null,
        posterUrl: req.body.posterUrl || null,
    }

    try {
        repository.addMovie(movie)
    } catch (err) {
        console.log(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
    }

    res.status(StatusCodes.OK).send('Movie added successfully');
}
