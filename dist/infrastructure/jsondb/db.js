"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lastInsertedId = exports.connection = exports.TEST_DB_PATH = exports.PROD_DB_PATH = exports.TEST_DB_NAME = exports.ORIG_DB_NAME = exports.PROD_DB_NAME = void 0;
const tslib_1 = require("tslib");
const promises_1 = tslib_1.__importDefault(require("fs/promises"));
exports.PROD_DB_NAME = 'db.json';
exports.ORIG_DB_NAME = 'db-orig.json';
exports.TEST_DB_NAME = 'db-test.json';
exports.PROD_DB_PATH = '/../../db/' + exports.PROD_DB_NAME;
exports.TEST_DB_PATH = '/../../db/' + exports.TEST_DB_NAME;
const connection = () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const dbPath = process.env.NODE_ENV === 'production'
        ? exports.PROD_DB_PATH
        : exports.TEST_DB_PATH;
    const data = yield promises_1.default.readFile(__dirname + dbPath, { encoding: 'utf8' });
    const buff = Buffer.from(data);
    return JSON.parse(buff.toString());
});
exports.connection = connection;
const lastInsertedId = () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const db = yield (0, exports.connection)();
    let lastId = db.movies[db.movies.length - 1].id;
    return ++lastId;
});
exports.lastInsertedId = lastInsertedId;
//# sourceMappingURL=db.js.map