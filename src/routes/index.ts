import express from "express";
import {add, search} from "./controller";
import {validateAddMovieRequest, validateSearchRequest} from "./validators";

const router = express.Router();

router.get('/', (req, res) => {
    res.send('API is up and running');
});

router.post('/add', validateAddMovieRequest, add);
router.get('/search', validateSearchRequest, search);

export default router;
