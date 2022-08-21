"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieService = void 0;
const tslib_1 = require("tslib");
class MovieService {
    constructor(moviesRepository) {
        this.moviesRepository = moviesRepository;
    }
    getRandomMovie() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const movies = yield this.moviesRepository.all();
            return movies[Math.floor((Math.random() * movies.length))];
        });
    }
    find(genresList, duration) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const movies = yield this.moviesRepository.all();
            if (genresList) {
                movies.forEach((movie) => {
                    const hasNoMatchingGenres = movie.genres.filter((genre) => genresList.includes(genre)) === [];
                    if (hasNoMatchingGenres) {
                        return;
                    }
                });
            }
            if (duration) {
                movies.filter((movie) => movie.runtime > duration - 10 && movie.runtime < duration + 10);
            }
            return movies;
        });
    }
}
exports.MovieService = MovieService;
//# sourceMappingURL=movieService.js.map