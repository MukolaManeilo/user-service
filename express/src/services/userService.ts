import { IRating } from '../models/rating';

/**
 * Calculates the weighted average of an array of numbers.
 * The weight decreases by 0.01 for each subsequent element.
 *
 * @param {number[]} arr - The array of numbers to calculate the weighted average for.
 * @returns {number} - The weighted average of the array.
 */

const weightedAverage = (arr: number[]): number => {
	if (arr.length === 0) return 0;

	// Flip the array so that the new values go first
	const reversedArr = [...arr].reverse();

	const { sum, totalWeight } = reversedArr.reduce(
		(acc, value, index) => {
			const weight = Math.max(1 - index * 0.02, 0);
			return {
				sum: acc.sum + value * weight,
				totalWeight: acc.totalWeight + weight,
			};
		},
		{ sum: 0, totalWeight: 0 }
	);

	return totalWeight ? sum / totalWeight : 0;
};

/**
 * Updates the user rating based on their activity log, task prices, and reviews.
 *
 * @param {IRating} rating - The rating object containing activity log, completed task prices, and reviews.
 * @returns {Promise<number>} - The new user rating.
 */

export const updateUserRating = async (rating: IRating): Promise<number> => {
	const thirtyDaysAgo = new Date();
	thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

	const activeDays = (rating.activityLog || []).filter((date) => date >= thirtyDaysAgo).length;

	const completedTasks = rating.completedTaskPrice?.length || 0;
	const recentTaskPrices = rating.completedTaskPrice?.slice(-50) || [];
	const avgTaskPrice = weightedAverage(recentTaskPrices) || 0;

	const reviewsAmount = rating.reviews?.length || 0;
	const recentReviews = rating.reviews?.slice(-50) || [];
	const avgReviewScore = weightedAverage(recentReviews) || 0;

	// Base score
	let newScore = 100;
	//Activity
	newScore += activeDays * 5;
	//Tasks
	newScore += avgTaskPrice;
	newScore += completedTasks * 10;
	//Reviews
	newScore += reviewsAmount * 10;
	newScore += avgReviewScore * 150;

	return Math.max(Math.round(newScore), 0);
};
