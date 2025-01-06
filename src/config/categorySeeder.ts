import Category from '../models/category';

const seed = async () => {

	if (await Category.findOne()) {
		console.log('Categories already exist, skipping seeding.');
		return;
	}

	const categories = [
		{
			name: 'Web Development',
			description: 'All things related to web development.',
			tags: ['HTML', 'CSS', 'JavaScript'],
			subCategories: [
				{
					name: 'Frontend Development',
					description: 'Frontend development technologies and frameworks.',
					tags: ['React', 'Vue', 'Angular'],
					subCategories: [
						{
							name: 'React',
							description: 'React.js framework for building UI.',
							tags: ['React', 'JSX', 'State Management'],
						},
						{
							name: 'Vue',
							description: 'Vue.js framework for building user interfaces.',
							tags: ['Vue', 'Vuex', 'Composition API'],
						},
					]
				},
				{
					name: 'Backend Development',
					description: 'Backend technologies and frameworks.',
					tags: ['Node.js', 'Express', 'MongoDB'],
					subCategories: [
						{
							name: 'Node.js',
							description: 'Node.js runtime for server-side applications.',
							tags: ['Node', 'JavaScript', 'Express'],
						},
						{
							name: 'Express',
							description: 'Web framework for Node.js.',
							tags: ['Express', 'Node', 'API'],
						},
					]
				},
			],
		},
		{
			name: 'Mobile Development',
			description: 'Mobile app development technologies and frameworks.',
			tags: ['React Native', 'Flutter', 'Xamarin'],
			subCategories: [
				{
					name: 'React Native',
					description: 'React Native framework for building cross-platform apps.',
					tags: ['React Native', 'Android', 'iOS'],
				},
				{
					name: 'Flutter',
					description: 'Flutter framework for building cross-platform apps.',
					tags: ['Flutter', 'Dart', 'Cross-Platform'],
				},
			],
		},
		{
			name: 'Data Science',
			description: 'Data Science, machine learning, and artificial intelligence.',
			tags: ['Python', 'R', 'Machine Learning'],
			subCategories: [
				{
					name: 'Machine Learning',
					description: 'Algorithms and techniques in machine learning.',
					tags: ['Python', 'Scikit-learn', 'TensorFlow'],
					subCategories: [
						{
							name: 'Supervised Learning',
							description: 'Algorithms for supervised learning.',
							tags: ['Linear Regression', 'Logistic Regression', 'SVM'],
						},
						{
							name: 'Unsupervised Learning',
							description: 'Algorithms for unsupervised learning.',
							tags: ['K-Means', 'PCA', 'Clustering'],
						},
					]
				},
				{
					name: 'Deep Learning',
					description: 'Deep learning algorithms and frameworks.',
					tags: ['TensorFlow', 'Keras', 'Neural Networks'],
				},
			],
		},
	];

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
				newCategory.subCategories.push(subCategories._id);
			}
		}
		await newCategory.save();
		return newCategory;
	};

	for (let category of categories) {
		await createCategoryWithSubcategories(category);
	}
};

const categorySeeder = () => {
	seed()
		.catch((err) => {
			if (err instanceof Error) {
				console.error(Error(`Error seeding categories: ${err.message}`));
			}else{
				console.error(Error('An unknown error occurred during category seeding'));
			}
			process.exit(1);
		});
}

export default categorySeeder;
