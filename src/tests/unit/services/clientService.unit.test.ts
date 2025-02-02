import { createClient, deleteClient, getClient, isClientExists, updateClient } from '../../../services/clientService';
import Client from '../../../models/client';

//jest.mock('../../../models/client');

jest.mock('../../../models/client', () => {
	const originalModule = jest.requireActual('../../../models/client');
	return {
		__esModule: true,
		...originalModule,
	};
});

describe('Client Service', () => {
	const mockClient = {
		_id: '1',
		firstName: 'John',
		lastName: 'Doe',
		email: 'johndoe@example.com',
		password: 'hashedPassword',
		rating: { scores: 0 },
	};

	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('should create and save a new client', async (): Promise<void> => {
		jest.spyOn(Client.prototype, 'save').mockResolvedValue(mockClient);

		const newClient = await createClient('John', 'Doe', 'johndoe@example.com', 'password123');

		expect(newClient.firstName).toBe('John');
		expect(newClient.lastName).toBe('Doe');
		expect(newClient.email).toBe('johndoe@example.com');
		expect(Client.prototype.save).toHaveBeenCalledTimes(1);
	});

	it('should get a client by id', async () => {
		Client.findById = jest.fn().mockResolvedValue(mockClient);

		const client = await getClient({ id: '1' });

		expect(client.firstName).toBe('John');
		expect(Client.findById).toHaveBeenCalledWith('1');
	});

	it('should get a client by email', async () => {
		Client.findOne = jest.fn().mockResolvedValue(mockClient);

		const client = await getClient({ email: 'johndoe@example.com' });

		expect(client.firstName).toBe('John');
		expect(Client.findOne).toHaveBeenCalledWith({ email: 'johndoe@example.com' });
	});

	it('should update a client', async () => {
		const updatedData = { firstName: 'Jane' };
		Client.findOne = jest.fn().mockResolvedValue(new Client(mockClient));
		jest.spyOn(Client.prototype, 'save').mockResolvedValue({
			...mockClient,
			firstName: 'Jane',
		});

		const updatedClient = await updateClient({ email: 'johndoe@example.com' }, updatedData);

		expect(updatedClient.firstName).toBe('Jane');
		expect(Client.prototype.save).toHaveBeenCalledTimes(1);
	});

	it('should check if client exists by id', async () => {
		Client.findById = jest.fn().mockResolvedValue(mockClient);

		const exists = await isClientExists({ id: '1' });

		expect(exists).toBe(true);
		expect(Client.findById).toHaveBeenCalledWith('1');
	});

	it('should check if client exists by email', async () => {
		Client.findOne = jest.fn().mockResolvedValue(mockClient);

		const exists = await isClientExists({ email: 'johndoe@example.com' });

		expect(exists).toBe(true);
		expect(Client.findOne).toHaveBeenCalledWith({ email: 'johndoe@example.com' });
	});

	it('should delete a client', async () => {
		Client.deleteOne = jest.fn().mockResolvedValue({ deletedCount: 1 });

		const result = await deleteClient({ email: 'johndoe@example.com' });

		expect(result).toBe(true);
		expect(Client.deleteOne).toHaveBeenCalledWith({ email: 'johndoe@example.com' });
	});

	it('should return false if client is not found while deleting', async () => {
		Client.deleteOne = jest.fn().mockResolvedValue({ deletedCount: 0 });

		const result = await deleteClient({ email: 'nonexistent@example.com' });

		expect(result).toBe(false);
		expect(Client.deleteOne).toHaveBeenCalledWith({ email: 'nonexistent@example.com' });
	});
});
