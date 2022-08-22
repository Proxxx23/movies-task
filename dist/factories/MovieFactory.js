"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMovieEntityFromRequest = void 0;
const tslib_1 = require("tslib");
const createMovieEntityFromRequest = (request) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    return {
        id: null,
        title: request.title,
        year: request.year,
        runtime: request.runtime,
        director: request.director,
        genres: request.genres,
        actors: request.actors || null,
        plot: request.plot || null,
        posterUrl: request.posterUrl || null,
    };
});
exports.createMovieEntityFromRequest = createMovieEntityFromRequest;
//# sourceMappingURL=MovieFactory.js.map