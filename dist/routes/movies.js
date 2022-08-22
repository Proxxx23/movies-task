"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const moviesController_1 = require("../controllers/moviesController");
const validators_1 = require("./validators");
const router = express_1.default.Router();
router.get('/', (req, res) => {
    res.send('API is up and running');
});
router.post('/add', validators_1.validateAddMovieRequest, moviesController_1.add);
router.get('/search', validators_1.validateSearchMovieRequest, moviesController_1.search);
exports.default = router;
//# sourceMappingURL=movies.js.map