import {NextFunction, Request, Response} from 'express';
import {UserRole} from "../types/userRole";
import Client from "../models/client";
import Expert from "../models/expert";
import {deleteExpert, getExpert, isExpertExists, updateExpert} from "../services/expertService";
import {deleteClient, getClient, isClientExists, updateClient} from "../services/clientService";


export const getUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	try {
		const userId: string = req.params.id;
		if (!userId || userId.trim() === '') throw new Error('User id is required');

		let user = null;
		let userType = '';

		const userIsExpert: boolean = await isExpertExists({ id: userId });
		if (userIsExpert) {
			user = await getExpert(userId);
			userType = 'Expert';
		} else {
			const userIsClient: boolean = await isClientExists({ id: userId });
			if (userIsClient) {
				user = await getClient(userId);
				userType = 'Client';
			}
		}

		if (user) {
			res.status(200).json({ message: `${userType} found`, user });
		} else {
			throw new Error('User not found');
		}
	} catch (err) {
		if (err instanceof Error) {
			return next(new Error(`Get user error: ${err.message}`));
		} else {
			return next(new Error('Something went wrong while getting the user'));
		}
	}
};



export const updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	try {
		if(!req.isAuthenticated()) throw new Error('User is already logged in');
		const userRole: UserRole = (req.user as UserUnion).userRole;
		let newUser = null;

		if(userRole === UserRole.Expert){
			if(req.user instanceof Expert){
				newUser = await updateExpert(req.user.id, req.body);
			}
		} else if(userRole === UserRole.Client) {
			if(req.user instanceof Client) {
				newUser = await updateClient(req.user.id, req.body);
			}
		}

		if(newUser){
			res.status(201).json({
				message: `${userRole} updated successfully`,
				user: newUser,
			});
		}else {
			throw new Error('Error updating user');
		}
	} catch (err) {
		if (err instanceof Error) {
			return next(new Error(`Update user error: ${err.message}`));
		} else {
			return next(new Error('Unknown error while updating the user'));
		}
	}
};



export const deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	try {
		if (!req.isAuthenticated()) throw new Error('User is not logged in');

		const userRole: UserRole = (req.user as UserUnion).userRole;
		let deletionSuccess = false;
		const user = req.user as UserUnion;
		req.logout((err) => {
			if (err) {
				return next(new Error('Error during logout'));
			}
			res.clearCookie('connect.sid');
		});

		if (userRole === UserRole.Expert) {
			if (user instanceof Expert) {
				deletionSuccess = await deleteExpert({ id: user.id });
			}
		} else if (userRole === UserRole.Client) {
			if (user instanceof Client) {
				deletionSuccess = await deleteClient({ id: user.id });
			}
		}

		if (deletionSuccess) {
			res.status(200).json({
				message: `${userRole} deleted successfully`,
			});
		} else {
			throw new Error('Error deleting user');
		}

	} catch (err) {
		if (err instanceof Error) {
			return next(new Error(`Delete user error: ${err.message}`));
		} else {
			return next(new Error('Something went wrong while deleting the user'));
		}
	}
};
