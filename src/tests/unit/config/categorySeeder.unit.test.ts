import categorySeeder from '../../../config/categorySeeder';
import Category, { ICategory } from '../../../models/category';
import categories from '../../../config/categories';
import { TestingError } from '../../../types/errorTypes';

describe('categorySeeder', () => {
	let errorHandlerMock: jest.Mock;

	beforeEach(() => {
		Category.prototype.save = jest.fn();
		errorHandlerMock = jest.fn();
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should save categories if none exist in the database', async () => {
		Category.findOne = jest.fn().mockResolvedValue(null);

		await categorySeeder(categories as ICategory[]).catch(() => errorHandlerMock());

		expect(Category.findOne).toHaveBeenCalled();
		expect(Category.prototype.save).toHaveBeenCalled();
		expect(errorHandlerMock).not.toHaveBeenCalled();
	});

	it('should skip saving if categories already exist in the database', async () => {
		Category.findOne = jest.fn().mockResolvedValue({ _id: '123' });

		await categorySeeder(categories as ICategory[]).catch(() => errorHandlerMock());

		expect(Category.findOne).toHaveBeenCalled();
		expect(Category.prototype.save).not.toHaveBeenCalled();
		expect(errorHandlerMock).not.toHaveBeenCalled();
	});

	it('should handle errors during seeding', async () => {
		const error = new TestingError('Testing error');
		Category.findOne = jest.fn().mockRejectedValue(error);

		await categorySeeder(categories as ICategory[]).catch((err) => errorHandlerMock(err));

		expect(Category.findOne).toHaveBeenCalled();
		expect(Category.prototype.save).not.toHaveBeenCalled();
		expect(errorHandlerMock).toHaveBeenCalledWith(new TestingError(`Error seeding categories: ${error.message}`));
	});
});
