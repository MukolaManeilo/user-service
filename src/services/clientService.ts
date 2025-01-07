import {hashPassword} from '../utils/hash';
import Client, {IClient} from "../models/client";


type ClientIdentifier = { id: string; email?: never } | { email: string; id?: never };

export const createClient = async (firstName: string, lastName: string, email: string, password: string): Promise<IClient> => {
	const hashedPassword = await hashPassword(password);
	if(!hashedPassword) throw new Error('Error hashing password');

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



export const getClient = async (id: string): Promise<IClient> => {
	const client = await Client.findById(id);
	if (!client) throw new Error('Client not found');
	return client;
};



export const updateClient = async (userId: string, data: Partial<IClient>): Promise<IClient> => {
	const client = await Client.findById(userId);
	if (!client) throw new Error('Client not found');

	Object.assign(client, data);
	await client.save().catch((err) => {
		throw new Error(`Error updating client: ${err.message}`);
	});
	return client;
}



export const isClientExists = async (identifier: ClientIdentifier): Promise<boolean> => {
	if ('id' in identifier) {
		const client = await Client.findById(identifier.id);
		return !!client;
	}

	if ('email' in identifier) {
		const client = await Client.findOne({ email: identifier.email });
		return !!client;
	}
	throw new Error('Invalid input');
};



export const deleteClient = async (identifier: ClientIdentifier): Promise<boolean> => {
	if ('id' in identifier) {
		const result = await Client.deleteOne({_id: identifier.id});
		return result.deletedCount > 0;
	}

	if ('email' in identifier) {
		const result = await Client.deleteOne({ email: identifier.email });
		return result.deletedCount > 0;
	}
	throw new Error('Invalid input');
};
