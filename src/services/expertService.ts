import Expert, {IExpert} from '../models/expert';
import Category from '../models/category';
import {hashPassword} from '../utils/hash';


type ExpertIdentifier = { id: string; email?: never } | { email: string; id?: never };

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



export const getExpert = async (id: string): Promise<IExpert> => {
	const expert = await Expert.findById(id);
	if (!expert) throw new Error('Expert not found');
	return expert;
};



export const updateExpert = async (userId: string, data: Partial<IExpert>): Promise<IExpert> => {
	const expert = await Expert.findById(userId);
	if (!expert) throw new Error('Expert not found');

	Object.assign(expert, data);
	await expert.save().catch((err) => {
		throw new Error(`Error updating expert: ${err.message}`);
	});
	return expert;
}



export const isExpertExists = async (identifier: ExpertIdentifier): Promise<boolean> => {
	if ('id' in identifier) {
		const expert = await Expert.findById(identifier.id);
		return !!expert;
	}

	if ('email' in identifier) {
		const expert = await Expert.findOne({ email: identifier.email });
		return !!expert;
	}
	throw new Error('Invalid input');
};



export const deleteExpert = async (identifier: ExpertIdentifier): Promise<boolean> => {
	if ('id' in identifier) {
		const result = await Expert.deleteOne({_id: identifier.id});
		return result.deletedCount > 0;
	}

	if ('email' in identifier) {
		const result = await Expert.deleteOne({ email: identifier.email });
		return result.deletedCount > 0;
	}
	throw new Error('Invalid input');
};