import {NextFunction, Request, Response} from 'express';
import {createExpert} from "../services/expertService";
import passport from "passport";
import Expert, {IExpert} from "../models/Expert";
import Client, {IClient} from "../models/Client";
import {User} from "../types/d/express";
import {createClient} from "../services/clientService";
import {UserRole} from "../types/userRole";


export const registerUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

	const {userRole, firstName, lastName, email, password, mentoring, skills} = req.body;

	try {
		if(req.isAuthenticated()) throw new Error('User is already logged in');

		if (await Client.findOne({ email }) || await Expert.findOne({ email })) {
			throw new Error('User with this email already exists.');
		}

		if(userRole === UserRole.Expert){
			const newExpert = await createExpert(firstName, lastName, email, password, mentoring, skills);

			req.login(newExpert, (err) => {
				if (err) throw new Error('Error logging in user after registration');

				res.status(201).json({
					message: 'Expert registered and logged in successfully',
					expert: newExpert,
				});
			});
		} else if(userRole === UserRole.Client) {
			const newClient = await createClient(firstName, lastName, email, password);

			req.login(newClient, (err) => {
				if (err) throw new Error('Error logging in user after registration');

				res.status(201).json({
					message: 'Client registered and logged in successfully',
					expert: newClient,
				});
			});
		}
	}
	catch(err) {
		if (err instanceof Error) {
			return next(new Error(`Registration error: ${err.message}`));
		} else {
			return next(new Error('Something went wrong during registration'));
		}
	}
};



export const loginUser = (req: Request, res: Response, next: NextFunction) => {
	const {email, password} = req.body;

	if(!email || !password) return next(new Error('Email and password are required'));
	if(req.isAuthenticated()) return next(new Error('User is already logged in'));

	passport.authenticate('local', (err: any, user: User, info: any) => {
		if(err) {
			if (err instanceof Error) {
				return next(new Error(`Login error: ${err.message}`));
			} else {
				return next(new Error('Something went wrong during login'));
			}
		}
		req.logIn(user, (err) => {
			if (err) {
				return next(new Error('Error logging in user after authentication'));
			}
			let response: {message: string, expert?: IExpert, client?: IClient} = { message: 'User successfully logged in'};
			if (user instanceof Expert) {
				response.expert = user;
			} else if (user instanceof Client) {
				response.client = user;
			}
			res.status(200).json(response);
		});
	})(req, res, next);
};



export const logoutUser = (req: Request, res: Response, next: NextFunction) => {

	if(!req.isAuthenticated()) return next(new Error('User is not logged in'));
	if(!req.user) return next(new Error('User not found'));

	req.logout((err) => {
		if (err) {
			if (err instanceof Error) {
				return next(new Error(`Logout error: ${err.message}`));
			} else {
				return next(new Error('Something went wrong during logout'));
			}
		} else {
			res.redirect('/');
		}
	});
};