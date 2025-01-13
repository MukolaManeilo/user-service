import {Request, Response} from 'express';
import {ICustomError, StartUpError} from "../types/errorTypes";


const errorHandler = (err: ICustomError, req?: Request, res?: Response) => {

	const statusCode = err.statusCode || 500;
	const message = err.message || 'Unknown server Error';

	console.error(`${err.name} : ${statusCode} : ${message}`);

	if (req && res) {
		res.status(statusCode).json({message: message});
	} else {
		if(err instanceof StartUpError){
			process.exit(1);
		}
	}
}

export default errorHandler;