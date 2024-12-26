import mongoose, {Document, Schema} from 'mongoose';
import {CategorySchema, ICategory} from "./Category";
import {IRating, RatingSchema} from "./Rating";


interface IExpert extends Document {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	balance: number;
	mentoring: boolean;
	category: ICategory;
	skills: string[];
	rating: IRating;
}


const ExpertSchema: Schema<IExpert> = new Schema({
	firstName: {type: String, required: true},
	lastName: {type: String, required: true},
	email: {type: String, required: true, unique: true, match: /^[a-zA-Z0-9]+@gmail\.com$/, set: (val: any) => val.toLowerCase()},
	password: {type: String, required: true, select: false},
	balance: {type: Number, default: 0, required: true},
	mentoring: {type: Boolean, default: false, required: true},
	category: {type: CategorySchema, required: true},
	skills:[{type: String, required: false}],
	rating: {type: RatingSchema, required: true},
}, { timestamps: true, })

const Expert = mongoose.model<IExpert>('Expert', ExpertSchema);
export default Expert;