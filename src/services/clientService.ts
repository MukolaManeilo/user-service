import {hashPassword} from '../utils/hash';
import Client, {IClient} from "../models/client";
import {DatabaseUpdatingError, InternalServerError, NotFoundError} from "../types/errorTypes";
import {errorValidator} from "../utils/errorHandler";


/**
 * Type representing an identifier for a Client.
 *
 * This type can either be an object with an `id` field and no `email` field,
 * or an object with an `email` field and no `id` field.
 */
type ClientIdentifier = { id: string; email?: never } | { email: string; id?: never };


export const createClient = async (firstName: string, lastName: string, email: string, password: string): Promise<IClient> => {
	const hashedPassword = await hashPassword(password);
	if(!hashedPassword) throw new InternalServerError('Error hashing password');

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



export const getClient = async (identifier: ClientIdentifier): Promise<IClient> => {
	const client = identifier.id
		? await Client.findById(identifier.id)
		: await Client.findOne({ email: identifier.email });
	if (!client) throw new NotFoundError('Client not found');
	return client;
};



export const updateClient = async (identifier: ClientIdentifier, data: Partial<IClient>): Promise<IClient> => {
	const client = identifier.id
		? await Client.findById(identifier.id)
		: await Client.findOne({ email: identifier.email });
	if (!client) throw new NotFoundError('Client not found');

	Object.assign(client, data);
	await client.save()
		.catch((err) => {
			throw errorValidator(err, new DatabaseUpdatingError(`Error updating client`));
		});
	return client;
}



export const isClientExists = async (identifier: ClientIdentifier): Promise<boolean> => {
	const client = identifier.id
		? await Client.findById(identifier.id)
		: await Client.findOne({ email: identifier.email });
	return !!client;
};



export const deleteClient = async (identifier: ClientIdentifier): Promise<boolean> => {
	const filter = identifier.id
		? { _id: identifier.id }
		: { email: identifier.email };

	const client = await Client.deleteOne(filter);
	return client.deletedCount > 0;
};