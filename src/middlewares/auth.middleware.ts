import { NextFunction, Request, Response } from 'express';
import { ErrorEnum } from '../exceptions/errorCodes';
import { HttpException } from '../exceptions/httpException';

export const validateRequests = async (req: Request, _res: Response, next: NextFunction) => {
    try {
        const CURRENT_API_KEY = process.env.API_KEY;

        const apiKey = req.headers['x-api-key'];

        if (!apiKey) {
        throw new HttpException(ErrorEnum._API_KEY_REQUIRED);
        }

        if (CURRENT_API_KEY === apiKey) {
        return next();
        }

        throw new HttpException(ErrorEnum._INVALID_API_KEY);
    } catch (error) {
        next(error);
    }
};

