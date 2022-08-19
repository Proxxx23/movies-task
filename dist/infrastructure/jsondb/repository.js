"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMoviesRepository = void 0;
const tslib_1 = require("tslib");
const fs_1 = tslib_1.__importDefault(require("fs"));
const DB_PATH = ''; // env
const createMoviesRepository = () => articleRepository(connection());
exports.createMoviesRepository = createMoviesRepository;
function articleRepository(db) {
    function addMovie(movie) {
        movie.id = getIncrementedId();
        db.movies[movie.id] = movie;
        console.log(JSON.stringify(db));
        try {
            fs_1.default.writeFileSync(__dirname + '/../db/db.json', JSON.stringify(db));
        }
        catch (err) {
            console.log('Could not add to DB' + err);
        }
        console.log('Niby poszło');
    }
    function find() {
        return db.movies[0];
    }
    function genres() {
        return db.genres;
    }
    function getIncrementedId() {
        return db.movies[db.movies.length].id;
    }
    return {
        addMovie,
        find,
        genres,
    };
}
function connection() {
    let db;
    try {
        db = fs_1.default.readFileSync(__dirname + '/../../db/db.json', { encoding: 'utf8' });
        return JSON.parse(db);
    }
    catch (err) {
        throw new Error('Could not connect to DB.' + err);
    }
}
//# sourceMappingURL=repository.js.map