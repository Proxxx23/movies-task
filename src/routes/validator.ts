import {check, validationResult} from "express-validator";
import {NextFunction, Request, Response} from "express";

export const validateMovieRequest = [
        check('genres')
            .isArray()
            .withMessage('Genres must be an array of strings')
            .bail()
            .not()
            .isEmpty()
            .withMessage('Genres list cannot be empty')
            .bail(),
        check('title')
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
        check('year')
            .not()
            .isEmpty()
            .withMessage('Year of production cannot be empty!')
            .bail()
            .isNumeric()
            .withMessage('Date of production must be numeric!')
            .bail(),
        check('runtime')
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
        check('director')
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
        check('actors')
            .optional()
            .isString()
            .withMessage('Actors must be string!'),
        check('plot')
            .optional()
            .isString()
            .withMessage('Plot must be string!'),
        check('posterUrl')
            .optional()
            .isURL()
            .withMessage('Poster URL must be an URL!'),

        (req: Request, res: Response, next: NextFunction) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({errors: errors.array()});
            }

            next();
        },
    ]
;
