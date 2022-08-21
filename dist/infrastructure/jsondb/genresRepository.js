"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGenresRepository = void 0;
const tslib_1 = require("tslib");
const db_1 = require("./db");
const createGenresRepository = () => tslib_1.__awaiter(void 0, void 0, void 0, function* () { return genresRepository(yield (0, db_1.connection)()); });
exports.createGenresRepository = createGenresRepository;
function genresRepository(db) {
    function all() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return db.genres;
        });
    }
    return {
        all,
    };
}
//# sourceMappingURL=genresRepository.js.map