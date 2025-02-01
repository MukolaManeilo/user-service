import mongoose, {Schema} from 'mongoose';
import {ICategory} from "./category";
import RatingSchema, {IRating} from "./rating";
import validator from "validator";
import {UserRole} from "../types/userRole";


export interface IExpert extends Document {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	userRole: UserRole;
	balance: number;
	mentoring: boolean;
	categories?: [{
		categoryId: ICategory,
		relevance: number,
	}];
	skills: string[];
	rating: IRating;
}


const ExpertSchema: Schema<IExpert> = new Schema({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	email: {
		type: String, required: true, unique: true,
		validate: {
			validator: (value: string) => validator.isEmail(value),
			message: 'Invalid email format',
		},
		set: (val: any) => val.toLowerCase(),
	},
	password: { type: String, required: true, minlength: 8, select: false },
	userRole: { type: String, enum: [UserRole.Expert], default: UserRole.Expert, required: true},
	balance: { type: Number, default: 0, min: [0, 'Balance cannot be negative'], required: true },
	mentoring: { type: Boolean, default: false, required: true },
	categories: [{
		categoryId: { type: mongoose.Types.ObjectId, ref: 'Category', required: true },
		relevance: { type: Number, min: 0, max: 1, required: true },
	}],
	skills: [{ type: String, required: true, default: []}],
	rating: { type: RatingSchema, default: () => ({}), required: true },
}, { timestamps: true, })


const Expert = mongoose.model<IExpert>('Expert', ExpertSchema);
export default Expert;