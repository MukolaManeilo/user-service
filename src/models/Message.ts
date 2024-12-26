import mongoose, {Document, Schema} from 'mongoose';
import {MessageType} from "../types/messageType";
import {UserRole} from "../types/userRole";


interface IMessage extends Document {
	chatId: mongoose.Types.ObjectId;
	senderRole: UserRole;
	type: MessageType;
	text?: string;
	materialsId?: mongoose.Types.ObjectId[];
	taskId?: mongoose.Types.ObjectId;
	revisedAt?: Date;
}


const MessageSchema: Schema<IMessage> = new Schema({
	chatId: { type: Schema.Types.ObjectId, ref: 'Chat', required: true },
	senderRole: { type: Number, Enum: Object.values(UserRole), required: true },
	type: { type: Number, enum: Object.values(MessageType), required: true },
	text: { type: String, required: false},
	materialsId: [{ type: Schema.Types.ObjectId, ref: 'Material', required: false}],
	taskId: { type: Schema.Types.ObjectId, ref: 'Task', required: false},
	revisedAt: { type: Date, required: false},
}, { timestamps: true, })

const Message = mongoose.model<IMessage>('Message', MessageSchema);
export default Message;