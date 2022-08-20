"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.search = exports.add = void 0;
const repository_1 = require("../infrastructure/jsondb/repository");
const http_status_codes_1 = require("http-status-codes");
const add = (req, res) => {
    const repository = (0, repository_1.createMoviesRepository)();
    const validGenres = repository.genres();
    const genres = req.body.genres;
    const allGenresValid = genres.every((genre) => validGenres.includes(genre));
    if (!allGenresValid) {
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).send('Invalid genre on a list!');
    }
    // todo: may be put in a factory, but factory will be coupled tightly with a framework (needs Request typing)
    const movie = {
        id: 0,
        title: req.body.title,
        year: req.body.year,
        runtime: req.body.runtime,
        director: req.body.director,
        genres: req.body.genres,
        actors: req.body.actors || null,
        plot: req.body.plot || null,
        posterUrl: req.body.posterUrl || null,
    };
    try {
        repository.add(movie);
    }
    catch (err) {
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send('Internal error - movie not added!');
    }
    return res.send('Movie added successfully!');
};
exports.add = add;
const search = (req, res) => {
    const repository = (0, repository_1.createMoviesRepository)();
    if (!req.query.genres && !req.query.duration) {
        return res.send(repository.fetchRandom());
    }
    const validGenres = repository.genres();
    const genres = req.query.genres;
    const allGenresValid = genres === null || genres === void 0 ? void 0 : genres.every((genre) => validGenres.includes(genre));
    if (!allGenresValid) {
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).send('Invalid genre on a list!');
    }
    return res.send('a');
};
exports.search = search;
//# sourceMappingURL=controller.js.map