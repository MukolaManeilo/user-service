import {updateUserRating} from "../../../services/userService";
import {IRating} from "../../../models/rating";

describe("updateUserRating", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});


	it("should return correct rating when all arrays have data", async () => {
		const now = new Date();
		const fiveDaysAgo = new Date();
		fiveDaysAgo.setDate(now.getDate() - 5);
		const activityLog = [now, fiveDaysAgo];
		const completedTaskPrice = [5,5,5,10,20,10,30,10,25,20,15];
		const reviews = [5,5,10,8,9,10,10,8];

		const rating: IRating = {
			activityLog,
			completedTaskPrice,
			reviews,
			scores: 0,
		};
		const score = await updateUserRating(rating);
		expect(score).toBe(1543);
	});


	it("should use default values for empty arrays", async () => {
		const rating: IRating = {
			activityLog: [],
			completedTaskPrice: [],
			reviews: [],
			scores: 0,
		};

		const score = await updateUserRating(rating);
		expect(score).toBe(100);
	});


	it("should ignore activityLog dates older than 30 days", async () => {
		const now = new Date();
		const thirtyOneDaysAgo = new Date();
		thirtyOneDaysAgo.setDate(now.getDate() - 31);
		const activityLog = [now, thirtyOneDaysAgo];

		const rating: IRating = {
			activityLog,
			completedTaskPrice: [],
			reviews: [],
			scores: 0,
		};

		const score = await updateUserRating(rating);
		expect(score).toBe(105);
	});


	it("should include activityLog dates exactly 30 days old", async () => {
		const now = new Date();
		const exactlyThirtyDaysAgo = new Date();
		exactlyThirtyDaysAgo.setDate(now.getDate() - 30);
		const activityLog = [exactlyThirtyDaysAgo, now];

		const rating: IRating = {
			activityLog,
			completedTaskPrice: [],
			reviews: [],
			scores: 0,
		};

		const score = await updateUserRating(rating);
		expect(score).toBe(110);
	});


	it("should handle undefined arrays by using default values", async () => {
		const now = new Date();
		const activityLog = [now];

		const rating = {
			activityLog,
		} as unknown as IRating;

		const score = await updateUserRating(rating);
		expect(score).toBe(105);
	});
});
