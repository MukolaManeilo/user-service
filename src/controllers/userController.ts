import { NextFunction, Request, Response } from 'express';
import { UserRole } from '../types/userRole';
import { UserUnion } from '../types/userUnion';
import Client from '../models/client';
import Expert from '../models/expert';
import { deleteExpert, getExpert, isExpertExists, updateExpert } from '../services/expertService';
import { deleteClient, getClient, isClientExists, updateClient } from '../services/clientService';
import {
	DatabaseUpdatingError,
	InputValidationError,
	LogoutUserError,
	NotFoundError,
	UnauthorizedError,
} from '../types/errorTypes';
import { errorValidator } from '../utils/errorHandler';

export const getUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	try {
		const userId: string = req.params.id;
		if (!userId || userId.trim() === '') throw new InputValidationError('User id is required');

		let user = null;
		let userType = '';

		const userIsExpert: boolean = await isExpertExists({ id: userId });
		if (userIsExpert) {
			user = await getExpert({ id: userId });
			userType = 'Expert';
		} else {
			const userIsClient: boolean = await isClientExists({ id: userId });
			if (userIsClient) {
				user = await getClient({ id: userId });
				userType = 'Client';
			}
		}

		if (user) {
			res.status(200).json({ message: `${userType} found`, user });
		} else {
			throw new NotFoundError('User not found');
		}
	} catch (err) {
		return next(errorValidator(err, 'Get user error'));
	}
};

export const updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	try {
		if (!req.isAuthenticated()) throw new UnauthorizedError();
		const userRole: UserRole = (req.user as UserUnion).userRole;
		let newUser = null;

		if (userRole === UserRole.Expert) {
			if (req.user instanceof Expert) {
				newUser = await updateExpert({ id: req.user.id }, req.body);
			}
		} else if (userRole === UserRole.Client) {
			if (req.user instanceof Client) {
				newUser = await updateClient({ id: req.user.id }, req.body);
			}
		}

		if (newUser) {
			res.status(201).json({
				message: `${userRole} updated successfully`,
				user: newUser,
			});
		} else {
			throw new DatabaseUpdatingError('Error updating user');
		}
	} catch (err) {
		return next(errorValidator(err, 'Update user error'));
	}
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	try {
		if (!req.isAuthenticated()) throw new UnauthorizedError();

		const userRole: UserRole = (req.user as UserUnion).userRole;
		let deletionSuccess = false;
		const user = req.user as UserUnion;
		req.logout((err) => {
			if (err) throw new LogoutUserError();
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
			throw new DatabaseUpdatingError('Error deleting user');
		}
	} catch (err) {
		return next(errorValidator(err, 'Delete user error'));
	}
};
