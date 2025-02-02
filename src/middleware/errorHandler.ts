import { NextFunction, Request, Response } from 'express';
import { errorHandler } from '../utils/errorHandler';
import { ICustomError } from '../types/errorTypes';

const errorHandlerMiddleware = (err: ICustomError, req: Request, res: Response, next: NextFunction) => {
	errorHandler(err, req, res);
	next();
};

export default errorHandlerMiddleware;
