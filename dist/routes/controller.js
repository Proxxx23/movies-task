"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addMovie = void 0;
const repository_1 = require("../infrastructure/jsondb/repository");
const http_status_codes_1 = require("http-status-codes");
const addMovie = (req, res) => {
    const repository = (0, repository_1.createMoviesRepository)();
    const movie = {
        id: 1000,
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
        repository.addMovie(movie);
    }
    catch (err) {
    }
    res.status(http_status_codes_1.StatusCodes.OK)
        .json('Movie added successfully')
        .end();
};
exports.addMovie = addMovie;
//# sourceMappingURL=controller.js.map