"use strict";
// write model
Object.defineProperty(exports, "__esModule", { value: true });
exports.Movie = void 0;
class Movie {
    constructor(id, title, year, runtime, director, genres, actors, plot, posterUrl) {
        this.id = id;
        this.title = title;
        this.year = year;
        this.runtime = runtime;
        this.director = director;
        this.genres = genres;
        this.actors = actors;
        this.plot = plot;
        this.posterUrl = posterUrl;
    }
    isValid() {
        return this.id !== null;
    }
}
exports.Movie = Movie;
//# sourceMappingURL=Movie.js.map