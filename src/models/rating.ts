import {Schema} from 'mongoose';
import {updateUserRating} from "../services/userService";

export interface IRating {
	scores: number;
	activityLog: Date[];
	completedTaskPrice: number[];
	reviews: number[];
}

const RatingSchema: Schema<IRating> = new Schema({
	scores: { type: Number, required: true },
	activityLog: [{ type: Date }],
	completedTaskPrice: [{ type: Number, min: 0 }],
	reviews: [{ type: Number, min: 1, max: 10 }],
});

RatingSchema.pre<IRating>('save', async function (next) {
	this.scores = await updateUserRating(this);
	next();
});

RatingSchema.index({ scores: 1 });

export default RatingSchema;
