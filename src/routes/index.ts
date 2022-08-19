import express from "express";
import {addMovie} from "./controller";

const router = express.Router();

// router.post('/', (req, res) => {
//     res.write('API is up and running');
//     res.end();
// });

router.get('/', (req, res) => {
    res.write('API is up and running');
    res.end();
});

router.post('/add', addMovie);

// router.get('/search', (req, res) => {
//     res.write('hello');
//     res.end();
// });

export default router;
