import mongoose, {Schema} from "mongoose";

export interface ICategory {
	name: string;
	description: string;
	tags: string[];
	subCategories: (mongoose.Types.ObjectId | ICategory | undefined)[];
}

export const CategorySchema: Schema<ICategory> = new Schema({
	name: { type: String, required: true },
	description: { type: String, required: true },
	tags: [{ type: String, required: false }],
	subCategories: [{ type: mongoose.Types.ObjectId, ref:'Category', required: true, default: [] }],
});

const Category = mongoose.model<ICategory>('Category', CategorySchema);

export default Category;