//Category initialization data
const categories = [
	{
		name: 'Web Development',
		description: 'Web development technologies and frameworks.',
		tags: ['HTML', 'CSS', 'JavaScript'],
		subCategories: [
			{
				name: 'Frontend',
				description: 'Frontend web development technologies and frameworks.',
				tags: ['React', 'Angular', 'Vue'],
				subCategories: [
					{
						name: 'React',
						description: 'React library for building user interfaces.',
						tags: ['React', 'JavaScript', 'Frontend'],
					},
					{
						name: 'Angular',
						description: 'Angular framework for building web applications.',
						tags: ['Angular', 'TypeScript', 'Frontend'],
					},
				],
			},
			{
				name: 'Backend',
				description: 'Backend web development technologies and frameworks.',
				tags: ['Node.js', 'Django', 'Flask'],
				subCategories: [
					{
						name: 'Node.js',
						description: 'Node.js runtime for building server-side applications.',
						tags: ['Node.js', 'JavaScript', 'Backend'],
					},
					{
						name: 'Django',
						description: 'Django framework for building web applications.',
						tags: ['Django', 'Python', 'Backend'],
					},
				],
			},
		],
	},
	{
		name: 'DevOps',
		description: 'DevOps tools and technologies.',
		tags: ['Docker', 'Kubernetes', 'Jenkins'],
		subCategories: [
			{
				name: 'Docker',
				description: 'Docker containerization platform.',
				tags: ['Docker', 'Containers', 'DevOps'],
			},
			{
				name: 'Kubernetes',
				description: 'Kubernetes container orchestration platform.',
				tags: ['Kubernetes', 'Containers', 'DevOps'],
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
				],
			},
			{
				name: 'Deep Learning',
				description: 'Deep learning algorithms and frameworks.',
				tags: ['TensorFlow', 'Keras', 'Neural Networks'],
			},
		],
	},
];

export default categories;
