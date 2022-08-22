"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoviesService = void 0;
const tslib_1 = require("tslib");
const randomMovie = (movies) => movies[Math.floor((Math.random() * movies.length))];
const isWithinValidDuration = (movieRuntime, duration) => movieRuntime >= duration - 10 && movieRuntime <= +duration + 10;
class MoviesService {
    constructor(moviesRepository) {
        this.moviesRepository = moviesRepository;
    }
    getRandomMovie(duration) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const allMovies = yield this.moviesRepository.fetchAll();
            if (duration) {
                const moviesWithinDuration = allMovies.filter((movie) => isWithinValidDuration(+movie.runtime, duration));
                return randomMovie(moviesWithinDuration);
            }
            return randomMovie(allMovies);
        });
    }
    find(genresList, duration) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const allMovies = yield this.moviesRepository.fetchAll();
            const filteredMovies = allMovies
                .map(movie => {
                const matchingGenresCount = movie.genres.filter((genre) => genresList.includes(genre)).length;
                const withinDurationLimit = !duration
                    ? true
                    : isWithinValidDuration(+movie.runtime, duration);
                if (matchingGenresCount > 0 && withinDurationLimit) {
                    return Object.assign({}, movie);
                }
            })
                .filter((movie) => movie !== undefined);
            this.sortByMatchingGenres(filteredMovies, genresList);
            return this.retrieveUniqueMovies(filteredMovies);
        });
    }
    sortByMatchingGenres(movies, genresList) {
        movies.sort((movie1, movie2) => {
            const m1 = movie1.genres.filter((genre) => genresList.includes(genre)).length;
            const m2 = movie2.genres.filter((genre) => genresList.includes(genre)).length;
            return m2 - m1;
        });
    }
    retrieveUniqueMovies(movies) {
        const map = new Map();
        for (const movie of movies) {
            map.set(movie.title, movie);
        }
        return [...map.values()];
    }
}
exports.MoviesService = MoviesService;
//# sourceMappingURL=moviesService.js.map