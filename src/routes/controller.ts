import {Request, Response} from "express";
import {createMoviesRepository} from "../infrastructure/jsondb/repository";
import {Movie} from "../models/Movie";
import {StatusCodes} from "http-status-codes";
import {DBMovie} from "../models/DBMovie";

interface SearchQueryParams {
    genres?: string[],
    duration?: number,
}

export const add = async (req: Request<{}, {}, Movie>, res: Response): Promise<Response<string>> => {
    const repository = await createMoviesRepository();
    const validGenres = await repository.genres();
    const genres = req.body.genres;

    const allGenresValid = genres.every((genre) => validGenres.includes(genre));
    if (!allGenresValid) {
        return res.status(StatusCodes.BAD_REQUEST).send('Invalid genre on a list!');
    }

    // todo: may be put in a factory, but factory will be coupled tightly with a framework (needs Request typing)
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
        await repository.add(movie)
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Internal error - movie not added!');
    }

    return res.send('Movie added successfully!');
}

export const search = async (req: Request<{}, {}, {}, SearchQueryParams>, res: Response): Promise<Response<DBMovie[] | string>> => {
    const repository = await createMoviesRepository();

    if (!req.query.genres && !req.query.duration) {
        return res.send(await repository.fetchRandom());
    }

    const validGenres = await repository.genres();
    const genres = req.query.genres;

    const allGenresValid = genres?.every((genre) => validGenres.includes(genre));
    if (!allGenresValid) {
        return res.status(StatusCodes.BAD_REQUEST).send('Invalid genre on a list!');
    }

    return res.send('a');
}
