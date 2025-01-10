import {createExpert, deleteExpert, getExpert, isExpertExists, updateExpert} from "../../../services/expertService";
import Expert from "../../../models/expert";
import Category from "../../../models/category";


jest.mock("../../../models/expert", () => {
	const originalModule = jest.requireActual("../../../models/expert");
	return {
		__esModule: true,
		...originalModule,
		findById: jest.fn(),
		findOne: jest.fn(),
		deleteOne: jest.fn(),
		save: jest.fn(),
	};
});

describe("Expert Service", () => {
	const mockExpert = {
		_id: '1',
		firstName: 'John',
		lastName: 'Doe',
		email: 'nonexistent@example.com',
		password: 'hashedPassword',
		mentoring: false,
		skills: ['JavaScript', 'TypeScript', 'Node.js', 'Express'],
		rating: { scores: 0 },
	};

	const mockCategory = {
		_id: '1',
		tags: ['javascript', 'typescript'],
	};

	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('should create and save a new expert', async (): Promise<void> => {
		Category.find = jest.fn().mockResolvedValue([mockCategory]);
		jest.spyOn(Expert.prototype, 'save').mockResolvedValue(mockExpert);

		const newExpert = await createExpert('John', 'Doe', 'nonexistent@example.com', 'password123', false, ['JavaScript', 'TypeScript', 'Node.js', 'Express']);

		expect(newExpert.firstName).toBe('John');
		expect(newExpert.lastName).toBe('Doe');
		expect(newExpert.email).toBe('nonexistent@example.com');
		expect(Expert.prototype.save).toHaveBeenCalledTimes(1);
		expect(Category.find).toHaveBeenCalledTimes(1);
	});

	it('should get a expert by id', async () => {
		Expert.findById = jest.fn().mockResolvedValue(mockExpert);

		const expert = await getExpert({ id: '1' });

		expect(expert.firstName).toBe('John');
		expect(Expert.findById).toHaveBeenCalledWith('1');
	});

	it('should get a expert by email', async () => {
		Expert.findOne = jest.fn().mockResolvedValue(mockExpert);

		const expert = await getExpert({ email: 'nonexistent@example.com' });

		expect(expert.firstName).toBe('John');
		expect(Expert.findOne).toHaveBeenCalledWith({ email: 'nonexistent@example.com' });
	});

	it('should update a expert', async () => {
		const updatedData = { firstName: 'Jane' };


		Expert.findOne = jest.fn().mockResolvedValue(new Expert(mockExpert));


		jest.spyOn(Expert.prototype, 'save').mockResolvedValue({
			...mockExpert,
			firstName: 'Jane',
		});

		const updatedExpert = await updateExpert({ email: 'nonexistent@example.com' }, updatedData);

		expect(updatedExpert.firstName).toBe('Jane');
		expect(Expert.prototype.save).toHaveBeenCalledTimes(1);
	});

	it('should check if expert exists by id', async () => {
		Expert.findById = jest.fn().mockResolvedValue(mockExpert);

		const exists = await isExpertExists({ id: '1' });

		expect(exists).toBe(true);
		expect(Expert.findById).toHaveBeenCalledWith('1');
	});

	it('should check if expert exists by email', async () => {
		Expert.findOne = jest.fn().mockResolvedValue(mockExpert);

		const exists = await isExpertExists({ email: 'nonexistent@example.com' });

		expect(exists).toBe(true);
		expect(Expert.findOne).toHaveBeenCalledWith({ email: 'nonexistent@example.com' });
	});

	it('should delete a expert', async () => {
		Expert.deleteOne = jest.fn().mockResolvedValue({ deletedCount: 1 });

		const result = await deleteExpert({ email: 'nonexistent@example.com' });

		expect(result).toBe(true);
		expect(Expert.deleteOne).toHaveBeenCalledWith({ email: 'nonexistent@example.com' });
	});

	it('should return false if expert is not found while deleting', async () => {
		Expert.deleteOne = jest.fn().mockResolvedValue({ deletedCount: 0 });

		const result = await deleteExpert({ email: 'nonexistent@example.com' });

		expect(result).toBe(false);
		expect(Expert.deleteOne).toHaveBeenCalledWith({ email: 'nonexistent@example.com' });
	});
});