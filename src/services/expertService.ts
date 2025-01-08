import Expert, {IExpert} from '../models/expert';
import Category from '../models/category';
import {hashPassword} from '../utils/hash';


/**
 * Type representing an identifier for an Expert.
 *
 * This type can either be an object with an `id` field and no `email` field,
 * or an object with an `email` field and no `id` field.
 */
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



export const getExpert = async (identifier: ExpertIdentifier): Promise<IExpert> => {
	const expert = identifier.id
		? await Expert.findById(identifier.id)
		: await Expert.findOne({ email: identifier.email });
	if (!expert) throw new Error('Expert not found');
	return expert;
};



export const updateExpert = async (identifier: ExpertIdentifier, data: Partial<IExpert>): Promise<IExpert> => {
	const expert = identifier.id
		? await Expert.findById(identifier.id)
		: await Expert.findOne({ email: identifier.email });
	if (!expert) throw new Error('Expert not found');

	Object.assign(expert, data);
	await expert.save()
		.catch((err) => {
			throw new Error(`Error updating expert: ${err.message}`);
		});
	return expert;
}



export const isExpertExists = async (identifier: ExpertIdentifier): Promise<boolean> => {
	const expert = identifier.id
		? await Expert.findById(identifier.id)
		: await Expert.findOne({ email: identifier.email });
	return !!expert;
};



export const deleteExpert = async (identifier: ExpertIdentifier): Promise<boolean> => {
	const filter = identifier.id
		? { _id: identifier.id }
		: { email: identifier.email };

	const expert = await Expert.deleteOne(filter);
	return expert.deletedCount > 0;
};