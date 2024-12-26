import {Schema} from "mongoose";

export interface ISubCategory {
	name: string;
	description: string;
	tags?: string[];
	subCategory?: ISubCategory;
}

export interface ICategory {
	name: string;
	description: string;
	tags?: string[];
	subCategory: ISubCategory;
}

export const SubCategorySchema: Schema<ISubCategory> = new Schema({
	name: { type: String, required: true },
	description: { type: String, required: true },
	tags: [{ type: String, required: false }],
	subCategory: { type: Schema.Types.Mixed, required: false },
});

export const CategorySchema: Schema<ICategory> = new Schema({
	name: { type: String, required: true },
	description: { type: String, required: true },
	tags: [{ type: String, required: false }],
	subCategory: { type: SubCategorySchema, required: false },
});