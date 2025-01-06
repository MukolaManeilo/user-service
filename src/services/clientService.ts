import {hashPassword} from '../utils/hash';
import Client, {IClient} from "../models/client";


export const createClient = async (firstName: string, lastName: string, email: string, password: string): Promise<IClient> => {

	const hashedPassword = await hashPassword(password);

	const newClient = new Client({
		firstName,
		lastName,
		email,
		password: hashedPassword,
		rating: { scores: 0 },
	});
	await newClient.save();
	return newClient;
};
