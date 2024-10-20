import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
    name: string;
    email: string;
    // інші поля...
}

const userSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    // інші поля...
});

export const User = mongoose.model<IUser>('User', userSchema); // іменований експорт
