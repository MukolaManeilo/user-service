import Expert from '../models/Expert';
import Category from '../models/Category';
import {hashPassword} from '../utils/hash';

// Helper function to calculate relevance
const calculateRelevance = (categoryTags: string[], userSkills: string[]): number => {
	const matches = categoryTags.filter(tag => userSkills.includes(tag)).length;
	return matches / categoryTags.length; // Relevance from 0 to 1
};

export const createExpert = async (firstName: string, lastName: string, email: string, password: string, mentoring: boolean, skills: string[]) => {

	if (await Expert.findOne({ email })) {
		throw new Error('User with this email already exists.');
	}

	const categories = await Category.find();

	const relevantCategories = categories
		.map(category => {
			const relevance = calculateRelevance(category.tags, skills || []);
			if (relevance) {
				return { categoryId: category._id, relevance };
			}
			return null;
		})
		.filter(Boolean); // Remove null values

	const hashedPassword = await hashPassword(password);

	const newExpert = new Expert({
		firstName,
		lastName,
		email,
		password: hashedPassword,
		mentoring: mentoring || false,
		categories: relevantCategories,
		skills: skills || [],
		rating: { scores: 0 },
	});


	await newExpert.save();
	return newExpert;
};
