import mongoose, {Document, Schema} from 'mongoose';
import {IRating, RatingSchema} from "./Rating";


interface IClient extends Document {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	balance: number;
	tasksId?: mongoose.Types.ObjectId[];
	rating: IRating;
}

const ClientSchema: Schema<IClient> = new Schema({
	firstName: {type: String, required: true},
	lastName: {type: String, required: true},
	email: {type: String, required: true},
	password: {type: String, required: true},
	balance: {type: Number, required: true},
	tasksId: [{type: Schema.Types.ObjectId, ref: "Task", require: false}],
	rating: {type: RatingSchema, required: true},
}, { timestamps: true, });


const Client = mongoose.model<IClient>('Client', ClientSchema);
export default Client;