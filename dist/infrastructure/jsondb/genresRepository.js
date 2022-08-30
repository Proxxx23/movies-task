"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGenresRepository = void 0;
const tslib_1 = require("tslib");
const jsondb_1 = require("../../../lib/database/src/jsondb");
const Table = 'genres';
const createGenresRepository = () => genresRepository();
exports.createGenresRepository = createGenresRepository;
function genresRepository() {
    function fetchAll() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const database = yield (0, jsondb_1.all)();
            return database[Table];
        });
    }
    return {
        fetchAll,
    };
}
//# sourceMappingURL=genresRepository.js.map