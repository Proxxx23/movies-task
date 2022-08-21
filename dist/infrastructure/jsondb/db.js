"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lastInsertedId = exports.connection = exports.DB_PATH = void 0;
const tslib_1 = require("tslib");
const promises_1 = tslib_1.__importDefault(require("fs/promises"));
exports.DB_PATH = '/../../db/db.json'; // fixme: ???
const connection = () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield promises_1.default.readFile(__dirname + exports.DB_PATH, { encoding: 'utf8' });
        const buff = Buffer.from(data);
        return JSON.parse(buff.toString());
    }
    catch (err) {
        //
    }
});
exports.connection = connection;
const lastInsertedId = () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const db = yield (0, exports.connection)();
    let lastId = db.movies[db.movies.length - 1].id;
    return ++lastId;
});
exports.lastInsertedId = lastInsertedId;
//# sourceMappingURL=db.js.map