import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};


app.use(express.json());


app.use('/api/users', userRoutes);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB();
});
