import Expert, {IExpert} from '../models/Expert';
import Category from '../models/Category';
import {hashPassword} from '../utils/hash';


/**
 * Calculates the relevance of a user's skills to a given category.
 *
 * @param {string[]} categoryTags - The tags associated with a category.
 * @param {string[]} userSkills - The skills of the user.
 * @returns {number} - The relevance score from 0 to 1, representing the proportion of matching tags.
 */
const calculateRelevance = (categoryTags: string[], userSkills: string[]): number => {
    const matches = categoryTags.filter(tag => userSkills.includes(tag)).length;
    return matches / categoryTags.length; // Relevance from 0 to 1
};



export const createExpert = async (firstName: string, lastName: string, email: string, password: string, mentoring: boolean, skills: string[]): Promise<IExpert> => {

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
