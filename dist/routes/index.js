"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const controller_1 = require("./controller");
const router = express_1.default.Router();
// router.post('/', (req, res) => {
//     res.write('API is up and running');
//     res.end();
// });
router.get('/', (req, res) => {
    res.write('API is up and running');
    res.end();
});
router.post('/add', controller_1.addMovie);
// router.get('/search', (req, res) => {
//     res.write('hello');
//     res.end();
// });
exports.default = router;
//# sourceMappingURL=index.js.map