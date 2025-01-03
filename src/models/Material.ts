import mongoose, {Document, Schema} from 'mongoose';


export interface IMaterial extends Document {
	name: string;
	type: string;
	size: number;
	fileURL: string;
}


const MaterialSchema: Schema<IMaterial> = new Schema({
	name: { type: String, required: true },
	type: { type: String, required: true },
	size: { type: Number, required: true },
	fileURL: { type: String, required: true },
}, { timestamps: true, })

const Material = mongoose.model<IMaterial>('Material', MaterialSchema);
export default Material;