import mongoose, {Schema} from "mongoose";

export interface ICategory extends Document {
	name: string;
	description: string;
	tags: string[];
	subCategories: (mongoose.Types.ObjectId | ICategory)[];
}

export const CategorySchema: Schema<ICategory> = new Schema({
	name: { type: String, required: true, unique: true },
	description: { type: String, required: true },
	tags: [{ type: String, required: true }],
	subCategories: [{ type: mongoose.Types.ObjectId, ref:'Category', default: [] }],
});

const Category = mongoose.model<ICategory>('Category', CategorySchema);

export default Category;