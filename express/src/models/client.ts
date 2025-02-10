import mongoose, { Schema } from 'mongoose';
import RatingSchema, { IRating } from './rating';
import validator from 'validator';
import { UserRole } from '../types/userRole';

export interface IClient {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	userRole: UserRole;
	balance: number;
	rating: IRating;
}

const ClientSchema: Schema<IClient> = new Schema(
	{
		firstName: { type: String, required: true },
		lastName: { type: String, required: true },
		email: {
			type: String,
			required: true,
			unique: true,
			validate: {
				validator: (value: string) => validator.isEmail(value),
				message: 'Invalid email format',
			},
			set: (val: string) => val.toLowerCase(),
		},
		password: { type: String, required: true, minlength: 8, select: false },
		userRole: {
			type: String,
			enum: [UserRole.Client],
			default: UserRole.Client,
			required: true,
		},
		balance: {
			type: Number,
			default: 0,
			min: [0, 'Balance cannot be negative'],
			required: true,
		},
		rating: { type: RatingSchema, default: () => ({}), required: true },
	},
	{ timestamps: true }
);

const Client = mongoose.model<IClient>('Client', ClientSchema);
export default Client;
