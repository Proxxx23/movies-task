"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTestServer = void 0;
const tslib_1 = require("tslib");
const dotenv = tslib_1.__importStar(require("dotenv"));
dotenv.config();
const express_1 = tslib_1.__importDefault(require("express"));
const movies_1 = tslib_1.__importDefault(require("./routes/movies"));
const createTestServer = () => {
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: false }));
    app.use('/', movies_1.default);
    process.env.NODE_ENV = 'test';
    return app;
};
exports.createTestServer = createTestServer;
//# sourceMappingURL=testServer.js.map