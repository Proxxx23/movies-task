import express from "express";
import {add, search} from "./controller";
import {validateAddMovieRequest, validateSearchMovieRequest} from "./validators";

const router = express.Router();

router.get('/', (req, res) => {
    res.send('API is up and running');
});

router.post('/add', validateAddMovieRequest, add);
router.get('/search', validateSearchMovieRequest, search);

export default router;
