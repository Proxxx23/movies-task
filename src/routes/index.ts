import express from "express";
import {addMovie} from "./controller";
import {validateMovieRequest} from "./validator";

const router = express.Router();

router.get('/', (req, res) => {
    res.send('API is up and running');
});

router.post('/add', validateMovieRequest, addMovie);

export default router;
