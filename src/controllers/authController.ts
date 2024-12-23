import {Request, Response} from 'express';
import {hashPassword} from '../utils/hash';

interface User {
	id: number;
	email: string;
	password: string;
}

const users: User[] = [
	{ id: 1, email: 'user@example.com', password: '$2b$10$abc123...' },
];

/**
 * Registration controller
 */
export const registerUser = async (req: Request, res: Response): Promise<void> => {
	const { email, password } = req.body;

	try {
		const hashedPassword = await hashPassword(password);

		const newUser: User = {
			id: users.length + 1,
			email,
			password: hashedPassword,
		};

		users.push(newUser);

		req.login(newUser, (err) => {
			if (err) {
				res.status(500).send('Error logging in after registration');
			} else {
				res.status(200).send('User registered and logged in');
			}
		});
	} catch (error) {
		res.status(500).send('Error during registration');
	}
};

/**
 * Login controller
 */
export const loginUser = (req: Request, res: Response): void => {
	res.status(200).send('User successfully logged in');
};

/**
 * Logout controller
 */
export const logoutUser = (req: Request, res: Response): void => {
	req.logout((err) => {
		if (err) {
			res.status(500).send('Logout error');
		} else {
			res.redirect('/');
		}
	});
};
