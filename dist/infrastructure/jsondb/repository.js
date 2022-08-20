"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMoviesRepository = void 0;
const tslib_1 = require("tslib");
const promises_1 = tslib_1.__importDefault(require("fs/promises"));
const fs_1 = tslib_1.__importDefault(require("fs"));
const DB_PATH = '/../../db/db.json'; // fixme: ???
const createMoviesRepository = () => articleRepository(connection());
exports.createMoviesRepository = createMoviesRepository;
function articleRepository(db) {
    function addMovie(movie) {
        movie.id = getIncrementedId();
        db.movies[movie.id] = movie;
        // todo: async?
        fs_1.default.writeFileSync(__dirname + DB_PATH, JSON.stringify({
            genres: db.genres,
            movies: db.movies.filter((x) => x !== null) // fixme: why do we have null value here and how to filter it out?
        }));
    }
    function fetchRandom() {
        return db.movies[Math.floor((Math.random() * db.movies.length))];
    }
    function find(genresList, duration) {
        if (genresList) {
            db.movies.forEach((movie) => {
                const hasNoMatchingGenres = movie.genres.filter((genre) => genresList.includes(genre)) === [];
                if (hasNoMatchingGenres) {
                    return;
                }
            });
        }
        if (duration) {
            db.movies.filter((movie) => movie.runtime > duration - 10 && movie.runtime < duration + 10);
        }
        return db.movies;
    }
    function genres() {
        return db.genres;
    }
    function getIncrementedId() {
        let lastId = db.movies[db.movies.length - 1].id;
        return ++lastId;
    }
    return {
        add: addMovie,
        find,
        fetchRandom,
        genres,
    };
}
function connection() {
    let db;
    try {
        db = () => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const data = yield promises_1.default.readFile("monolitic.txt", "binary");
            return new Buffer(data, 'utf-8');
        });
    }
    catch (err) {
        throw new Error('Could not connect to DB. ' + err);
    }
    return JSON.parse(db.toString());
}
//# sourceMappingURL=repository.js.map