import { Request, Response } from 'express';
import { User } from '../models/User'; // Зміна на іменований експорт


// Метод для створення нового користувача
export const createUser = async (req: Request, res: Response) => {
    try {
        const newUser = await User.create(req.body);
        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
};

// Метод для отримання інформації про користувача
export const getUsers = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id; // Отримання ID користувача з параметрів запиту
        const user = await User.findById(userId); // Знайти користувача за ID

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ user });
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(400).json({ message: 'An unknown error occurred' });
        }
    }
};
