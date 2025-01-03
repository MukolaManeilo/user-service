import {NextFunction, Request, Response} from 'express';
import {createExpert} from "../services/expertService";


export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
	const {isExpert, firstName, lastName, email, password, mentoring, skills} = req.body;
	
	try {
		if(isExpert){
			const newExpert = await createExpert(firstName, lastName, email, password, mentoring, skills);

			req.login(newExpert, (err) => {
				if (err) {
					throw new Error('Error logging in user after registration');
				}
				res.status(201).json({
					message: 'Expert registered and logged in successfully',
					expert: newExpert,
				});
			});

		}
	}
	catch(err) {
		if (err instanceof Error) {
			next(Error(`Registration error: ${err.message}`));
		} else {
			next(Error('Something went wrong during registration'));
		}
	}
};


export const loginUser = (req: Request, res: Response): void => {
	res.status(200).send('User successfully logged in');
};


export const logoutUser = (req: Request, res: Response): void => {
	req.logout((err) => {
		if (err) {
			res.status(500).send('Logout error');
		} else {
			res.redirect('/');
		}
	});
};
