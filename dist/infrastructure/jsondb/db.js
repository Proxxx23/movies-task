"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lastInsertedId = exports.persist = exports.all = exports.TEST_DB_PATH = exports.PROD_DB_PATH = exports.TEST_DB_NAME = exports.ORIG_DB_NAME = exports.PROD_DB_NAME = void 0;
const tslib_1 = require("tslib");
const promises_1 = tslib_1.__importDefault(require("fs/promises"));
const promises_2 = tslib_1.__importDefault(require("fs/promises"));
exports.PROD_DB_NAME = 'db.json';
exports.ORIG_DB_NAME = 'db-orig.json';
exports.TEST_DB_NAME = 'db-test.json';
exports.PROD_DB_PATH = '/../../db/a' + exports.PROD_DB_NAME;
exports.TEST_DB_PATH = '/../../db/' + exports.TEST_DB_NAME;
// In real DB this connection will be open and shared but let's leave it for now
const connection = () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const data = yield promises_1.default.readFile(yield dbPath(), { encoding: 'utf8' });
    const buffer = Buffer.from(data);
    return JSON.parse(buffer.toString());
});
const all = () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    return yield connection();
});
exports.all = all;
const persist = (movie) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const db = yield connection();
    movie.id = yield (0, exports.lastInsertedId)();
    db.movies[movie.id] = movie;
    const moviesTable = {
        genres: db.genres,
        movies: db.movies.filter((x) => x !== null && x !== undefined)
    };
    yield promises_2.default.writeFile(yield dbPath(), JSON.stringify(moviesTable));
    return yield (0, exports.lastInsertedId)();
});
exports.persist = persist;
const lastInsertedId = () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const db = yield connection();
    return ++db.movies[db.movies.length - 1].id;
});
exports.lastInsertedId = lastInsertedId;
const dbPath = () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    let path;
    switch (process.env.NODE_ENV) {
        case 'production':
            path = exports.PROD_DB_PATH;
            break;
        case 'test':
            path = exports.TEST_DB_PATH;
            break;
        default:
            throw new Error('Invalid NODE_ENV value!');
    }
    return __dirname + path;
});
//# sourceMappingURL=db.js.map