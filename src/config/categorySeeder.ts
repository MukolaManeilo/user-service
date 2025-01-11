import Category, {ICategory} from '../models/category';


const categorySeeder = async (categories: ICategory[]) => {
	try{
		if (await Category.findOne()) {
			console.log('Categories already exist, skipping seeding.');
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
		if (err instanceof Error) {
			throw new Error(`Error seeding categories: ${err.message}`);
		} else {
			throw new Error('An unknown error occurred during category seeding');
		}
	}
};

export default categorySeeder;