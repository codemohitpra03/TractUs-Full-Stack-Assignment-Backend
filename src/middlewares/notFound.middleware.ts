import { Response, Request } from 'express';
import { ApiResponse } from '../utils/apiResponse.util';

export const notFound = (_: Request, res: Response) =>
  res.status(404).json(new ApiResponse('Route doesnt Exist', {}, 404));
