"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMoviesRepository = void 0;
const tslib_1 = require("tslib");
const promises_1 = tslib_1.__importDefault(require("fs/promises"));
const db_1 = require("./db");
const createMoviesRepository = () => tslib_1.__awaiter(void 0, void 0, void 0, function* () { return moviesRepository(yield (0, db_1.connection)()); });
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
            yield promises_1.default.writeFile(__dirname + db_1.PROD_DB_PATH, JSON.stringify({
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