"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.search = exports.add = void 0;
const tslib_1 = require("tslib");
const moviesRepository_1 = require("../infrastructure/jsondb/moviesRepository");
const genresRepository_1 = require("../infrastructure/jsondb/genresRepository");
const movieService_1 = require("../services/movieService");
const http_status_codes_1 = require("http-status-codes");
const db_1 = require("../infrastructure/jsondb/db");
const add = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    let db;
    try {
        db = yield (0, db_1.connection)();
    }
    catch (err) {
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send('Could not connect to database!');
    }
    const moviesRepository = yield (0, moviesRepository_1.createMoviesRepository)(db);
    const genresRepository = yield (0, genresRepository_1.createGenresRepository)(db);
    const validGenres = yield genresRepository.all();
    const genres = req.body.genres;
    const allGenresValid = genres.every((genre) => validGenres.includes(genre));
    if (!allGenresValid) {
        return res.status(http_status_codes_1.StatusCodes.UNPROCESSABLE_ENTITY).send('Invalid genre on a list!');
    }
    // todo???: May be put in a factory createFromRequest() method
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
        yield moviesRepository.add(movie);
    }
    catch (err) {
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send('Internal error - movie not added!');
    }
    return res.send(movie);
});
exports.add = add;
const search = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    let db;
    try {
        db = yield (0, db_1.connection)();
    }
    catch (err) {
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send('Could not connect to database!');
    }
    const moviesRepository = yield (0, moviesRepository_1.createMoviesRepository)(db);
    const genresRepository = yield (0, genresRepository_1.createGenresRepository)(db);
    const moviesService = new movieService_1.MovieService(moviesRepository);
    if (!req.query.genres) {
        return res.send(yield moviesService.getRandomMovie(req.query.duration));
    }
    const allowedGenres = yield genresRepository.all();
    const allGenresValid = req.query.genres.every((genre) => allowedGenres.includes(genre));
    if (!allGenresValid) {
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).send('Invalid genre on a list!');
    }
    return res.send(yield moviesService.find(req.query.genres, req.query.duration));
});
exports.search = search;
//# sourceMappingURL=controller.js.map