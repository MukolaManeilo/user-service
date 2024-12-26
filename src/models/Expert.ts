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
	tasksId: mongoose.Types.ObjectId[];
	rating: IRating;
}


const ExpertSchema: Schema<IExpert> = new Schema({
	firstName: {type: String, required: true},
	lastName: {type: String, required: true},
	email: {type: String, required: true},
	password: {type: String, required: true},
	balance: {type: Number, required: true},
	mentoring: {type: Boolean, required: true},
	category: {type: CategorySchema, required: true},
	skills:[{type: String, required: false}],
	tasksId: [{type: Schema.Types.ObjectId, ref: "Task", required: false}],
	rating: {type: RatingSchema, required: true},
}, { timestamps: true, })

const Expert = mongoose.model<IExpert>('Expert', ExpertSchema);
export default Expert;