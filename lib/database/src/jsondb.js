"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lastInsertedId = exports.insert = exports.all = exports.TEST_DB = exports.ORIG_DB = void 0;
const tslib_1 = require("tslib");
const promises_1 = tslib_1.__importDefault(require("fs/promises"));
const fs_1 = tslib_1.__importDefault(require("fs"));
// fixme: it should all be defined in .env to be lib unaware
const PROD_DB = 'db.json';
exports.ORIG_DB = 'db-orig.json';
exports.TEST_DB = 'db-test.json';
// In real DB this connection will be open but let's leave it for now
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
        if (!database[table]) {
            throw new Error(`Could not read from database. Table "${table}" does not exist in database.`);
        }
        let lastId = yield (0, exports.lastInsertedId)(table);
        object.id = ++lastId;
        database[table].push(object);
        //fixme: it can be done synchronously
        fs_1.default.writeFile(yield dbPath(), JSON.stringify(database, null, 4), () => { });
        return object.id;
    }));
});
exports.insert = insert;
const lastInsertedId = (table) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const database = yield (0, exports.all)();
    const dbtable = database[table] || undefined;
    return Array.isArray(dbtable)
        ? database[table][database[table].length - 1].id
        : undefined;
});
exports.lastInsertedId = lastInsertedId;
/**
 * @throws Error
 */
const dbPath = () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    let path;
    switch (process.env.NODE_ENV) {
        case 'production':
            path = `${__dirname}/../${PROD_DB}`;
            break;
        case 'test':
            path = `${__dirname}/../${exports.TEST_DB}`;
            break;
        default:
            throw new Error('Could not connect to a database: invalid environment');
    }
    try {
        yield promises_1.default.access(path);
    }
    catch (err) {
        throw new Error('Could not connect to a database: no database found');
    }
    return path;
});
//# sourceMappingURL=db.js.map