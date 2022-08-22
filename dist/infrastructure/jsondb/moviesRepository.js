"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMoviesRepository = void 0;
const tslib_1 = require("tslib");
const promises_1 = tslib_1.__importDefault(require("fs/promises"));
const db_1 = require("./db");
const createMoviesRepository = (db) => tslib_1.__awaiter(void 0, void 0, void 0, function* () { return moviesRepository(db); });
exports.createMoviesRepository = createMoviesRepository;
function moviesRepository(db) {
    function all() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return db.movies;
        });
    }
    function add(movie) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            movie.id = yield (0, db_1.lastInsertedId)();
            db.movies[movie.id] = movie;
            const dbPath = process.env.NODE_ENV === 'production'
                ? db_1.PROD_DB_PATH
                : db_1.TEST_DB_PATH;
            yield promises_1.default.writeFile(__dirname + dbPath, JSON.stringify({
                genres: db.genres,
                movies: db.movies.filter((x) => x !== null && x !== undefined)
            }));
        });
    }
    return {
        all,
        add,
    };
}
//# sourceMappingURL=moviesRepository.js.map