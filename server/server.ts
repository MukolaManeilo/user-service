import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes'; // Імпортуйте маршрути користувачів

// Завантаження змінних середовища з файлу .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Налаштування підключення до MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// Middleware для обробки JSON
app.use(express.json());

// Використання маршруту для API користувачів
app.use('/api/users', userRoutes);

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB(); // Підключення до MongoDB при запуску сервера
});
