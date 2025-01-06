import {Document, Schema} from 'mongoose';

export interface IRating extends Document {
	scores: number;
	activityLog?: Date[];
	responseTime?: number[];
	sessionPrice?: number[];
	reviews?: number[];
}

export const RatingSchema: Schema<IRating> = new Schema({
	scores: { type: Number, default: 100, required: true },
	activityLog: [{ type: Date, required: false }],
	responseTime: [{ type: Number, required: false,
		validate: {
			validator: (value: number) => value >= 0,
			message: 'Response time cannot be negative.',
		}
	}],
	sessionPrice: [{ type: Number, min: 0, required: false }],
	reviews: [{ type: Number, min: 1, max: 10, required: false }],
});

RatingSchema.index({ scores: 1 });