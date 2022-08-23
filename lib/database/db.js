"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insert = exports.all = exports.TEST_DB_PATH = exports.PROD_DB_PATH = exports.TEST_DB_NAME = exports.ORIG_DB_NAME = exports.PROD_DB_NAME = void 0;
const tslib_1 = require("tslib");
const promises_1 = tslib_1.__importDefault(require("fs/promises"));
exports.PROD_DB_NAME = 'db.json';
exports.ORIG_DB_NAME = 'db-orig.json';
exports.TEST_DB_NAME = 'db-test.json';
exports.PROD_DB_PATH = '/../../src/db/' + exports.PROD_DB_NAME;
exports.TEST_DB_PATH = '/../../src/db/' + exports.TEST_DB_NAME;
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
/**
 * @throws Error
 */
const insert = (table, object) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    return (0, exports.all)().then((database) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const records = database[table];
        object.id = yield lastInsertedId(records);
        if (!database.hasOwnProperty(table)) {
            throw new Error(`Table ${table} does not exist in database.`);
        }
        database[table].push(object);
        yield promises_1.default.writeFile(yield dbPath(), JSON.stringify(database));
        return yield lastInsertedId(database[table]);
    }));
});
exports.insert = insert;
const lastInsertedId = (records) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    return ++records[records.length - 1].id;
});
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
            throw new Error('Could not connect to a database: invalid environment');
    }
    try {
        yield promises_1.default.access(__dirname + path);
    }
    catch (err) {
        throw new Error('Could not connect to a database: no database found');
    }
    return __dirname + path;
});
//# sourceMappingURL=db.js.map