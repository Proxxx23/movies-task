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
            let filtered = [];
            if (genresList) {
                filtered = movies.map(movie => {
                    const matchingGenresCount = movie.genres.filter((genre) => genresList.includes(genre)).length;
                    if (matchingGenresCount > 0) {
                        return Object.assign(Object.assign({}, movie), { matchingGenresCount });
                    }
                });
            }
            console.log(filtered);
            movies.forEach((movie) => {
                // filtered.sort((movie1, movie2) => movie2.matchingGenresCount - movie1.matchingGenresCount);
                if (duration && (+movie.runtime > duration - 10 && +movie.runtime < +duration + 10)) {
                    const index = movies.findIndex((item) => item.id === movie.id); // index to remove
                    if (index > -1) { // found index
                        filtered.push(Object.assign(Object.assign({}, movie), { matchingGenresCount: 0 }));
                    }
                }
            });
            if (filtered) {
                filtered.sort((movie1, movie2) => movie2.matchingGenresCount - movie1.matchingGenresCount);
                return filtered;
            }
            return movies;
        });
    }
}
exports.MovieService = MovieService;
//# sourceMappingURL=movieService.js.map