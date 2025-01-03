import mongoose, {Document, Schema} from 'mongoose';
import {ICategory} from "./Category";
import {IRating, RatingSchema} from "./Rating";

export interface IExpert extends Document {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	balance: number;
	mentoring: boolean;
	categories?: [{
		categoryId: ICategory,
		relevance: number,
	}];
	skills: string[];
	rating?: IRating;
}


const ExpertSchema: Schema<IExpert> = new Schema({
	firstName: {type: String, required: true},
	lastName: {type: String, required: true},
	email: {type: String, required: true, unique: true,
		match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
		set: (val: any) => val.toLowerCase()},
	password: {type: String, required: true, select: false},
	balance: {type: Number, default: 0, required: true},
	mentoring: {type: Boolean, default: false, required: true},
	categories: [{
		categoryId: {type: mongoose.Types.ObjectId, ref: 'Category', required: true},
		relevance: {type: Number, min: 0, max: 1, required: true},
	}],
	skills:[{type: String, required: true, default: []}],
	rating: {type: RatingSchema, required:false},
}, { timestamps: true, })


const Expert = mongoose.model<IExpert>('Expert', ExpertSchema);
export default Expert;