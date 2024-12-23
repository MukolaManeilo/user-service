import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

dotenv.config();

const mongoURI = String(process.env.MONGODB_URI);

const connectDB = () => {
	mongoose.connect(mongoURI)
		.then(() => {
			console.log('MongoDB connected');
		})
		.catch((err) => {
			console.error('MongoDB connecting error:', err);
		});
}

export default connectDB;