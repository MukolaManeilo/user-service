import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import errorHandler from "../utils/errorHandler";
import {StartUpError} from "../types/errorTypes";

dotenv.config();

const mongoURI = String(process.env.MONGODB_URI);

const connectDB = (uri: string = mongoURI) => {
	mongoose.connect(uri)
		.then(() => {
			console.log('MongoDB connected');
		})
		.catch((err) => {
			if (err instanceof Error) {
				return errorHandler(new StartUpError(`MongoDB connecting Error: ${err.message}`));
			} else {
				return errorHandler(new StartUpError('An unknown error occurred during MongoDB connection'));
			}
		});
}

export default connectDB;