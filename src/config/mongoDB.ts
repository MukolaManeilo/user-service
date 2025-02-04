import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import { errorHandler, errorValidator } from '../utils/errorHandler';
import { EnvironmentVariableError, StartUpError } from '../types/errorTypes';

dotenv.config();

const mongoURI = String(process.env.MONGODB_URI);
if (!mongoURI && !process.env.TESTING_MONGODB_URI) {
	errorHandler(new EnvironmentVariableError('MONGODB_URI is not defined in .env file'));
}

const connectDB = async (uri: string = mongoURI) => {
	await mongoose
		.connect(uri)
		.then(() => {
			console.log('MongoDB connected');
		})
		.catch((err) => {
			throw errorHandler(errorValidator(err, new StartUpError(`MongoDB connecting Error`)));
		});
};

export default connectDB;
