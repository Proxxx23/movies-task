"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const index_1 = tslib_1.__importDefault(require("../index"));
const supertest_1 = tslib_1.__importDefault(require("supertest"));
const http_status_codes_1 = require("http-status-codes");
describe('Testing POSTS/shots endpoint', () => {
    it('respond with valid HTTP status code and description and message', () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        // Make POST Request
        const response = yield (0, supertest_1.default)(index_1.default).get('/').send();
        expect(response.status).toBe(http_status_codes_1.StatusCodes.OK);
    }));
});
//# sourceMappingURL=any.js.map