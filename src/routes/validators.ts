import {body, query, validationResult, CustomValidator} from "express-validator";
import {NextFunction, Request, Response} from "express";
import {StatusCodes} from "http-status-codes";

export const validateAddMovieRequest = [
        body('genres')
            .isArray()
            .withMessage('Genres must be an array of strings')
            .bail()
            .not()
            .isEmpty()
            .withMessage('Genres list cannot be empty')
            .bail(),
        body('title')
            .isString()
            .withMessage('Movie title must be a string !')
            .bail()
            .not()
            .isEmpty()
            .withMessage('Movie title cannot be empty!')
            .bail()
            .isLength(
                {
                    min: 1, max: 255
                }
            )
            .withMessage('Movie title cannot be longer than 255 characters!')
            .bail(),
        body('year')
            .not()
            .isEmpty()
            .withMessage('Year of production cannot be empty!')
            .bail()
            .isNumeric()
            .withMessage('Date of production must be numeric!')
            .bail(),
        body('runtime')
            .not()
            .isEmpty()
            .withMessage('Runtime cannot be empty!')
            .bail()
            .isNumeric()
            .withMessage('Runtime must be a numeric value')
            .bail()
            .isLength(
                {
                    min: 1, max: 999
                }
            )
            .withMessage('Runtime must be within 1-999 range!')
            .bail(),
        body('director')
            .trim()
            .not()
            .isEmpty()
            .withMessage('Director name cannot be empty!')
            .bail()
            .isLength(
                {
                    min: 1, max: 255
                }
            )
            .withMessage('Director name cannot be longer than 255 characters!')
            .bail(),
        body('actors')
            .optional()
            .isString()
            .withMessage('Actors must be string!'),
        body('plot')
            .optional()
            .isString()
            .withMessage('Plot must be string!'),
        body('posterUrl')
            .optional()
            .isURL()
            .withMessage('Poster URL must be an URL!'),

        (req: Request, res: Response, next: NextFunction) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({errors: errors.array()});
            }

            next();
        },
    ];

export const validateSearchMovieRequest = [
    query('duration')
        .optional()
        .isNumeric()
        .withMessage('Duration must be numeric!')
        .bail(),

    query('genres')
        .optional()
        .custom((value, {req}) => {
            if (typeof req.query.genres === 'string' && req.query.genres.trim().includes(',')) {
                return false;
            }

            return (Array.isArray(req.query.genres) || typeof req.query.genres === 'string') && req.query.genres.length > 0;
        })
        .withMessage('Genres must be specified as an non-empty array or single string value!')
        .bail(),

    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(StatusCodes.BAD_REQUEST).json({errors: errors.array()});
        }

        next();
    },
]
