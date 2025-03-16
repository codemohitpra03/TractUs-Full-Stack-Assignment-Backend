import { Response, Request, NextFunction } from 'express';
import { HttpException } from '../exceptions/httpException';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandlerMiddleware = async (error: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(error);

  if (error instanceof HttpException) {
    return res.status(error.status).json({
      message: error.message,
      status: error.status,
      success: false,
    });
  }

  return res.status(500).json({
    message: 'Internal server error',
    status: 500,
    success: false,
  });
};
