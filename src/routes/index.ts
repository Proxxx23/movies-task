import express from "express";

const router = express.Router();

router.get('/abc', function(req, res, next) {
    res.write('hello');
    res.end();
});

export default router;
