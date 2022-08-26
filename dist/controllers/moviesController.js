"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.search = exports.add = void 0;
const tslib_1 = require("tslib");
const moviesRepository_1 = require("../infrastructure/jsondb/moviesRepository");
const genresRepository_1 = require("../infrastructure/jsondb/genresRepository");
const moviesService_1 = require("../services/moviesService");
const http_status_codes_1 = require("http-status-codes");
const movieFactory_1 = require("../factories/movieFactory");
const add = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const moviesRepository = yield (0, moviesRepository_1.createMoviesRepository)();
    const genresRepository = yield (0, genresRepository_1.createGenresRepository)();
    const validGenres = yield genresRepository.fetchAll();
    const allGenresValid = req.body.genres.every((genre) => validGenres.includes(genre));
    if (!allGenresValid) {
        return res.status(http_status_codes_1.StatusCodes.UNPROCESSABLE_ENTITY).send('Invalid genre on a list!');
    }
    const movie = (0, movieFactory_1.createMovieEntityFromRequest)(req.body);
    try {
        yield moviesRepository.add(movie);
        return res.send({
            data: movie
        });
    }
    catch (err) {
        if (err instanceof Error) {
            return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send(err.message);
        }
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send('Internal error - movie not added!');
    }
});
exports.add = add;
const search = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const moviesService = new moviesService_1.MoviesService(yield (0, moviesRepository_1.createMoviesRepository)());
    const genres = Array.isArray(req.query.genres) ? req.query.genres : [req.query.genres];
    if (!req.query.genres || genres.length === 0) {
        return res.send({
            data: yield moviesService.getRandomMovie(req.query.duration)
        });
    }
    return res.send({
        data: yield moviesService.find(genres, req.query.duration)
    });
});
exports.search = search;
//# sourceMappingURL=moviesController.js.map