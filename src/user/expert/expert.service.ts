import { Injectable, NotFoundException } from '@nestjs/common';
import { ExpertRepository } from './expert.repository';
import { CreateExpertDto } from './dto/create-expert.dto';
import { UpdateExpertDto } from './dto/update-expert.dto';
import { Expert } from '@prisma/client';
import { hashPassword } from '../../helpers/hash';
import { CategoryRepository } from '../../category/category.repository';
import { ExpertCategoryRepository } from '../../repositories/expert-category.repository';
import { RatingRepository } from '../rating/rating.repository';

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
	const matches = categoryTags.filter((tag) => userSkills.includes(tag)).length;
	return matches / categoryTags.length; // Relevance from 0 to 1
};

@Injectable()
export class ExpertService {
	constructor(
		private readonly expertRepository: ExpertRepository,
		private readonly categoryRepository: CategoryRepository,
		private readonly expertCategoryRepository: ExpertCategoryRepository,
		private readonly ratingRepository: RatingRepository
	) {}

	async createExpert(data: CreateExpertDto): Promise<Expert> {
		const categories = await this.categoryRepository.getAll();

		const relevantCategories = categories
			.map((category) => {
				const relevance = calculateRelevance(category.tags, data.skills || []);
				if (relevance) return { categoryId: category.id, relevance };
				return null;
			})
			.filter((item) => item !== null); // Remove null values

		const hashedPassword = await hashPassword(data.password);

		const rating = {
			scores: 0,
			activityLog: [new Date()],
			completedTaskPrice: [5, 5, 5],
			reviews: [5, 5],
		};

		const createdRating = await this.ratingRepository.create(rating);

		const expertData = {
			...data,
			password: hashedPassword,
			rating: { connect: { id: createdRating.id } },
		};

		const expert = await this.expertRepository.create(expertData);

		await Promise.all(
			relevantCategories.map(({ categoryId, relevance }) =>
				this.expertCategoryRepository.create({
					expertId: expert.id,
					categoryId,
					relevance,
				})
			)
		);

		return expert;
	}

	async getExpert(identifier: ExpertIdentifier): Promise<Expert | null> {
		const expert = await this.expertRepository.find(identifier);
		if (!expert) throw new NotFoundException('Expert not found');
		return expert;
	}

	async updateExpert(identifier: ExpertIdentifier, data: UpdateExpertDto): Promise<Expert | null> {
		const expert = await this.expertRepository.update(identifier, data);
		if (!expert) throw new NotFoundException('Expert not found');
		return expert;
	}

	async deleteExpert(identifier: ExpertIdentifier): Promise<Expert | null> {
		const expert = await this.expertRepository.delete(identifier);
		if (!expert) throw new NotFoundException('Expert not found');
		return expert;
	}

	// export const updateExpert = async (identifier: ExpertIdentifier, data: Partial<IExpert>): Promise<IExpert> => {
	// 	const expert = identifier.id
	// 		? await Expert.findById(identifier.id)
	// 		: await Expert.findOne({ email: identifier.email });
	// 	if (!expert) throw new NotFoundError('Expert not found');
	//
	// 	Object.assign(expert, data);
	// 	await expert.save().catch((err) => {
	// 		throw errorValidator(err, new DatabaseUpdatingError(`Error updating expert`));
	// 	});
	// 	return expert;
	// };
	//
	// export const isExpertExists = async (identifier: ExpertIdentifier): Promise<boolean> => {
	// 	const expert = identifier.id
	// 		? await Expert.findById(identifier.id)
	// 		: await Expert.findOne({ email: identifier.email });
	// 	return !!expert;
	// };
	//
	// export const deleteExpert = async (identifier: ExpertIdentifier): Promise<boolean> => {
	// 	const filter = identifier.id ? { _id: identifier.id } : { email: identifier.email };
	//
	// 	const expert = await Expert.deleteOne(filter);
	// 	return expert.deletedCount > 0;
	// };
}
