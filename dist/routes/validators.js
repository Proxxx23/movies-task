"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSearchMovieRequest = exports.validateAddMovieRequest = void 0;
const express_validator_1 = require("express-validator");
const http_status_codes_1 = require("http-status-codes");
exports.validateAddMovieRequest = [
    (0, express_validator_1.body)('genres')
        .isArray()
        .withMessage('Genres must be an array of strings')
        .bail()
        .not()
        .isEmpty()
        .withMessage('Genres list cannot be empty')
        .bail(),
    (0, express_validator_1.body)('title')
        .isString()
        .withMessage('Movie title must be a string !')
        .bail()
        .not()
        .isEmpty()
        .withMessage('Movie title cannot be empty!')
        .bail()
        .isLength({
        min: 1, max: 255
    })
        .withMessage('Movie title cannot be longer than 255 characters!')
        .bail(),
    (0, express_validator_1.body)('year')
        .not()
        .isEmpty()
        .withMessage('Year of production cannot be empty!')
        .bail()
        .isNumeric()
        .withMessage('Date of production must be numeric!')
        .bail(),
    (0, express_validator_1.body)('runtime')
        .not()
        .isEmpty()
        .withMessage('Runtime cannot be empty!')
        .bail()
        .isNumeric()
        .withMessage('Runtime must be a numeric value')
        .bail()
        .isLength({
        min: 1, max: 999
    })
        .withMessage('Runtime must be within 1-999 range!')
        .bail(),
    (0, express_validator_1.body)('director')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Director name cannot be empty!')
        .bail()
        .isLength({
        min: 1, max: 255
    })
        .withMessage('Director name cannot be longer than 255 characters!')
        .bail(),
    (0, express_validator_1.body)('actors')
        .optional()
        .isString()
        .withMessage('Actors must be string!'),
    (0, express_validator_1.body)('plot')
        .optional()
        .isString()
        .withMessage('Plot must be string!'),
    (0, express_validator_1.body)('posterUrl')
        .optional()
        .isURL()
        .withMessage('Poster URL must be an URL!'),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(http_status_codes_1.StatusCodes.UNPROCESSABLE_ENTITY).json({ errors: errors.array() });
        }
        next();
    },
];
exports.validateSearchMovieRequest = [
    (0, express_validator_1.query)('duration')
        .optional()
        .isNumeric()
        .withMessage('Duration must be numeric!')
        .bail(),
    (0, express_validator_1.query)('genres')
        .optional()
        .not()
        .custom((value, { req }) => {
        if ((Array.isArray(req.query.genres || typeof req.query.genres === 'string')) && req.query.genres.length > 0) {
            console.log(req.query.genres.length);
            return true;
        }
        throw new Error('Fuck you');
    })
        .withMessage('Genres must be specified as an non-empty array!')
        .bail(),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
        }
        next();
    },
];
//# sourceMappingURL=validators.js.map