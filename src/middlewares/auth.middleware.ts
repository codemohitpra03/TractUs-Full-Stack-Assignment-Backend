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


export const validateOrigin = async (req: Request, _res: Response, next: NextFunction) => {
    try {
        const allowedOrigins = ['https://uponly.lol', 'http://localhost:5173']

        
        const origin = req.headers.origin || req.headers.referer;
        const userAgent = req.headers['user-agent'] || '';
        console.log("Origin: ", origin);
        console.log("User Agent: ", userAgent);

        if (userAgent.includes('Postman')) {
            throw new HttpException(ErrorEnum._UNAUTHORIZED_ORIGIN);
        }

        if (!origin) {
            throw new HttpException(ErrorEnum._UNAUTHORIZED_ORIGIN);
        }
        
        // Check if the origin is allowed
        if (origin && !allowedOrigins.includes(origin)) {
            throw new HttpException(ErrorEnum._UNAUTHORIZED_ORIGIN);
        }
      
        
        next();

        
    } catch (error) {
        next(error);
    }
};