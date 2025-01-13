import {NextFunction, Request, Response} from 'express';
import passport from "passport";
import Expert, {IExpert} from "../models/expert";
import Client, {IClient} from "../models/client";
import {createClient, isClientExists} from "../services/clientService";
import {createExpert, isExpertExists} from "../services/expertService";
import {UserRole} from "../types/userRole";
import {ICustomError, ValidationError} from "../types/errorTypes";


export const registerUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	try {
		const {userRole, firstName, lastName, email, password, mentoring, skills} = req.body;

		if(req.isAuthenticated()) throw new ValidationError('User is already logged in');
		const exists = await isClientExists({ email }) || await isExpertExists({ email });
		if (exists) {
			throw new ValidationError('User with this email already exists.');
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
			return;
		} else if(userRole === UserRole.Client) {
			const newClient = await createClient(firstName, lastName, email, password);

			req.login(newClient, (err) => {
				if (err) throw new Error('Error logging in user after registration');

				res.status(201).json({
					message: 'Client registered and logged in successfully',
					expert: newClient,
				});
			});
			return;
		}
		throw new ValidationError('Invalid user role');
	}
	catch(err) {
		if ((err as ICustomError).message) {
			return next(`Registration error: ${(err as ICustomError).message}`);
		} else {
			return next(new Error('Something went wrong during registration'));
		}
	}
};



export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
	try{
		const {email, password} = req.body;

		if(!email || !password) return next(new ValidationError('Email and password are required'));
		if(req.isAuthenticated()) return next(new ValidationError('User is already logged in'));
		const exists = await isClientExists({ email }) || await isExpertExists({ email });
		if (!exists) throw new ValidationError('The user with this address does not exist');


		passport.authenticate('local', (err: any, user: UserUnion, info: any) => {
			if(err) {
				if ((err as ICustomError).message) {
					return next(`Login error: ${err.message}`);
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
	}catch(err) {
		if ((err as ICustomError).message) {
			return next(`LogIn error: ${(err as ICustomError).message}`);
		} else {
			return next(new Error('Something went wrong during login'));
		}
	}
};



export const logoutUser = (req: Request, res: Response, next: NextFunction) => {
	try {
		if(!req.isAuthenticated()) return next(new ValidationError('User is not logged in'));

		req.logout((err) => {
			if (err) {
				if (err.message) {
					return next(`Logout error: ${err.message}`);
				} else {
					return next(new Error('Something went wrong during logout'));
				}
			} else {
				res.clearCookie('connect.sid').redirect('/');
			}
		});
	} catch(err) {
		if ((err as ICustomError).message) {
			return next(`LogOut error: ${(err as ICustomError).message}`);
		} else {
			return next(new Error('Something went wrong during logout'));
		}
	}
};