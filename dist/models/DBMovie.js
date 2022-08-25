"use strict";
// write model
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBMovie = void 0;
class DBMovie {
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
}
exports.DBMovie = DBMovie;
//# sourceMappingURL=DBMovie.js.map