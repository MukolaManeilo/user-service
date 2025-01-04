import mongoose, {Document, Schema} from 'mongoose';
import {TaskStatus} from "../types/taskStatus";


interface ITask extends Document {
	status: TaskStatus;
	expertId: mongoose.Types.ObjectId;
	clientId: mongoose.Types.ObjectId;
	price: number;
	taskDescription: string;
	startDate: Date;
	deadline: Date;
	materialsId?: mongoose.Types.ObjectId[];
}


const TaskSchema: Schema<ITask> = new Schema({
	expertId: { type: Schema.Types.ObjectId, ref: 'Expert', required: true, },
	clientId: { type: Schema.Types.ObjectId, ref: 'Client', required: true },
	status: {
		type: Number, enum: Object.values(TaskStatus),
		default: TaskStatus.NotStarted, required: true
	},
	price: { type: Number, default: 0, min: [0, 'Price cannot be negative.'], required: true },
	taskDescription: { type: String, required: true },
	startDate: { type: Date, required: true },
	deadline: {
		type: Date, required: true,
		validate: {
			validator: function (value: Date) {
				return value > this.startDate;
			},
			message: 'Deadline must be after the start date.',
		},
	},
	materialsId: [{ type: mongoose.Types.ObjectId, ref: 'Material', required: false }],
}, { timestamps: true, })

TaskSchema.index({ expertId: 1 });
TaskSchema.index({ clientId: 1 });

const Task = mongoose.model<ITask>('Task', TaskSchema);
export default Task;