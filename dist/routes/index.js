"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const controller_1 = require("./controller");
const validators_1 = require("./validators");
const router = express_1.default.Router();
router.get('/', (req, res) => {
    res.send('API is up and running');
});
router.post('/add', validators_1.validateAddMovieRequest, controller_1.add);
router.get('/search', validators_1.validateSearchRequest, controller_1.search);
exports.default = router;
//# sourceMappingURL=index.js.map