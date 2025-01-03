import mongoose, {Document, Schema} from 'mongoose';
import {IRating, RatingSchema} from "./Rating";


export interface IClient extends Document {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	balance: number;
	rating: IRating;
}

const ClientSchema: Schema<IClient> = new Schema({
	firstName: {type: String, required: true},
	lastName: {type: String, required: true},
	email: {type: String, required: true, unique: true,
		match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
		set: (val: any) => val.toLowerCase()},
	password: {type: String, required: true, select: false},
	balance: {type: Number, default: 0, required: true},
	rating: {type: RatingSchema, required: true},
}, { timestamps: true, });


const Client = mongoose.model<IClient>('Client', ClientSchema);
export default Client;