import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import {errorHandler, errorValidator} from "../utils/errorHandler";
import {StartUpError} from "../types/errorTypes";

dotenv.config();

const mongoURI = String(process.env.MONGODB_URI);

const connectDB = async (uri: string = mongoURI) => {
	await mongoose.connect(uri)
		.then(() => {
			console.log('MongoDB connected');
		})
		.catch((err) => {
			throw errorHandler(errorValidator(err, new StartUpError(`MongoDB connecting Error`)));
		});
}

export default connectDB;