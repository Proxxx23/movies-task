"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMoviesRepository = void 0;
const tslib_1 = require("tslib");
const db_1 = require("./db");
const createMoviesRepository = () => tslib_1.__awaiter(void 0, void 0, void 0, function* () { return moviesRepository(); });
exports.createMoviesRepository = createMoviesRepository;
function moviesRepository() {
    function fetchAll() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const allRecords = yield (0, db_1.all)();
            return allRecords.movies;
        });
    }
    function add(movie) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield (0, db_1.persist)(movie);
        });
    }
    return {
        fetchAll,
        add,
    };
}
//# sourceMappingURL=moviesRepository.js.map