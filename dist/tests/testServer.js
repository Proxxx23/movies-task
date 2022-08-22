"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTestServer = void 0;
const tslib_1 = require("tslib");
const dotenv = tslib_1.__importStar(require("dotenv"));
dotenv.config();
const express_1 = tslib_1.__importDefault(require("express"));
const routes_1 = tslib_1.__importDefault(require("../routes"));
const fs = tslib_1.__importStar(require("fs"));
const db_1 = require("../infrastructure/jsondb/db");
const createTestServer = () => {
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: false }));
    app.use('/', routes_1.default);
    process.env.NODE_ENV = 'test';
    // Set test DB to the clear state
    app.on('close', () => {
        fs.copyFile(__dirname + '/../db/' + db_1.ORIG_DB_NAME, __dirname + '/../db/' + db_1.TEST_DB_NAME, (err) => {
            if (err) {
                console.log('Could not replicate test DB from original structure.');
            }
        });
    });
    return app;
};
exports.createTestServer = createTestServer;
//# sourceMappingURL=testServer.js.map