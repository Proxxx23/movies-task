"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const router = express_1.default.Router();
router.get('/abc', function (req, res, next) {
    res.write('hello');
    res.end();
});
exports.default = router;
//# sourceMappingURL=index.js.map