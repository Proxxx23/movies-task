"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMovieEntityFromRequest = void 0;
const Movie_1 = require("../models/Movie");
const createMovieEntityFromRequest = (request) => {
    return new Movie_1.Movie(null, // set by a DB
    request.title, request.year, request.runtime, request.director, request.genres, request.actors || null, request.plot || null, request.posterUrl || null);
};
exports.createMovieEntityFromRequest = createMovieEntityFromRequest;
//# sourceMappingURL=movieFactory.js.map