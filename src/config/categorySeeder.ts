import Category, {ICategory} from '../models/category';
import {StartUpError} from "../types/errorTypes";
import {errorValidator} from "../utils/errorHandler";


const categorySeeder = async (categories: ICategory[]): Promise<void> => {
	try{
		if (await Category.findOne()) {
			console.log('Skipping categories seeding.');
			return;
		} else {
			console.log('Seeding categories');
		}

		const createCategoryWithSubcategories = async (category: {
			name: string;
			description: string;
			tags: string[];
			subCategories?: any[];
		}) => {
			const newCategory = new Category({
				name: category.name,
				description: category.description,
				tags: category.tags,
				subCategories: [],
			});
			if (category.subCategories && category.subCategories.length) {
				for (let sub of category.subCategories) {
					const subCategories = await createCategoryWithSubcategories(sub);
					if (!newCategory.subCategories) {
						newCategory.subCategories = [];
					}
					newCategory.subCategories.push(subCategories._id);
				}
			}
			await newCategory.save();
			return newCategory;
		};
		for (let category of categories) {
			await createCategoryWithSubcategories(category);
		}
	}catch (err) {
		throw errorValidator(err, new StartUpError('Error seeding categories'));
	}
};

export default categorySeeder;