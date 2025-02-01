import {NextFunction, Request, Response} from 'express';
import passport from "passport";
import Expert, {IExpert} from "../models/expert";
import Client, {IClient} from "../models/client";
import {createClient, isClientExists} from "../services/clientService";
import {createExpert, isExpertExists} from "../services/expertService";
import {UserRole} from "../types/userRole";
import {errorValidator} from "../utils/errorHandler";
import {
	InputValidationError,
	LoggedUserError,
	LoggingUserError,
	LogoutUserError,
	NotFoundError,
	UnauthorizedError
} from "../types/errorTypes";


export const registerUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	try {
		const {userRole, firstName, lastName, email, password, mentoring, skills} = req.body;

		if(req.isAuthenticated()) throw new LoggedUserError();

		const exists = await isClientExists({ email }) || await isExpertExists({ email });
		if (exists) throw new InputValidationError('User with this email already exists.');

		if(userRole === UserRole.Expert){
			const newExpert = await createExpert(firstName, lastName, email, password, mentoring, skills);

			req.login(newExpert, (err) => {
				if (err) throw errorValidator(err, new LoggingUserError());
				res.status(201).json({
					message: 'Expert registered and logged in successfully',
					expert: newExpert,
				});
			});
			return;
		} else if(userRole === UserRole.Client) {
			const newClient = await createClient(firstName, lastName, email, password);

			req.login(newClient, (err) => {
				if (err) throw errorValidator(err, new LoggingUserError());
				res.status(201).json({
					message: 'Client registered and logged in successfully',
					expert: newClient,
				});
			});
			return;
		}
		throw new InputValidationError('Invalid user role');
	}
	catch(err) {
		return next(errorValidator(err, 'Registration error'));
	}
};



export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
	try{
		const {email, password} = req.body;

		if(!email || !password) throw new InputValidationError('Email and password are required');
		if(req.isAuthenticated()) throw new LoggedUserError();
		const exists = await isClientExists({ email }) || await isExpertExists({ email });
		if (!exists) throw new NotFoundError('The user with this address does not exist');


		passport.authenticate('local', (err: any, user: UserUnion) => {
			if (err) throw errorValidator(err, new LoggingUserError());
			req.logIn(user, (err) => {
				if (err) throw errorValidator(err, new LoggingUserError());
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
		return next(errorValidator(err, 'LogIn error'));
	}
};



export const logoutUser = (req: Request, res: Response, next: NextFunction) => {
	try {
		if(!req.isAuthenticated()) throw new UnauthorizedError();

		req.logout((err) => {
			if (err) {
				throw errorValidator(err, new LogoutUserError());
			} else {
				res.clearCookie('connect.sid').redirect('/');
			}
		});
	} catch(err) {
		return next(errorValidator(err, 'Logout error'));
	}
};