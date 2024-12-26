import mongoose, {Document, Schema} from 'mongoose';
import {TaskStatus} from "../types/taskStatus";


interface ITask extends Document {
	status: TaskStatus;
	price: number;
	taskDescription: string;
	startDate: Date;
	deadline: Date;
	materialsId?: mongoose.Types.ObjectId[];
}


const TaskSchema: Schema<ITask> = new Schema({
	status: {type: Number, Enum: Object.values(TaskStatus), ref: 'Status', required: true},
	price: {type: Number, required: true},
	taskDescription: {type: String, required: true},
	startDate: {type: Date, required: true},
	deadline: {type: Date, required: true},
	materialsId: [{type: mongoose.Types.ObjectId, ref: 'Material', required: false}],
}, { timestamps: true, })

const Task = mongoose.model<ITask>('Task', TaskSchema);
export default Task;