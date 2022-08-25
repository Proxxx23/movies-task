"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lastInsertedId = exports.insert = exports.all = exports.TEST_DB = exports.ORIG_DB = void 0;
const tslib_1 = require("tslib");
const promises_1 = tslib_1.__importDefault(require("fs/promises"));
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
        const records = database[table];
        let lastId = yield (0, exports.lastInsertedId)(records);
        object.id = ++lastId;
        if (!database.hasOwnProperty(table)) {
            throw new Error(`Table ${table} does not exist in database.`);
        }
        database[table].push(object);
        yield promises_1.default.writeFile(yield dbPath(), JSON.stringify(database, null, 4));
        return object.id;
    }));
});
exports.insert = insert;
const lastInsertedId = (records) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    return records[records.length - 1].id;
});
exports.lastInsertedId = lastInsertedId;
/**
 * @throws Error
 */
const dbPath = () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    let fileName;
    switch (process.env.NODE_ENV) {
        case 'production':
            fileName = PROD_DB;
            break;
        case 'test':
            fileName = exports.TEST_DB;
            break;
        default:
            throw new Error('Could not connect to a database: invalid environment');
    }
    console.log(`${__dirname}/${fileName}`);
    try {
        yield promises_1.default.access(`${__dirname}/${fileName}`);
    }
    catch (err) {
        throw new Error('Could not connect to a database: no database found');
    }
    return `${__dirname}/${fileName}`;
});
//# sourceMappingURL=db.js.map