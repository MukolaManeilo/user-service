import {Request, Response} from 'express';
import errorHandler from "../utils/errorHandler";


const errorHandlerMiddleware = (err: Error, req: Request, res: Response) => {
	errorHandler(err, req, res);
}

export default errorHandlerMiddleware;