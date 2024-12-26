import {Schema} from "mongoose";

export interface IRating {
	scores: number;
	activityLog?: Date[];
	responseTime?: number[];
	sessionPrice?: number[];
	reviews?: number[];
}

export const RatingSchema: Schema<IRating> = new Schema({
	scores: {type: Number, default: 100, required: true},
	activityLog: [{type: Date, required: false}],
	responseTime: [{type: Number, required: false}],
	sessionPrice: [{type: Number, required: false}],
	reviews: [{type: Number, required: false}],
})