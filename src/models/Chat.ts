import mongoose, {Document, Schema} from 'mongoose';


interface IChat extends Document {
	expertId: mongoose.Types.ObjectId;
	clientId: mongoose.Types.ObjectId;
	lastMessageId: mongoose.Types.ObjectId;
}


const ChatSchema: Schema<IChat> = new Schema({
	expertId: { type: Schema.Types.ObjectId, ref: 'Expert', required: true },
	clientId: { type: Schema.Types.ObjectId, ref: 'Client', required: true },
	lastMessageId: { type: Schema.Types.ObjectId, ref: 'Message', required: true },
}, { timestamps: true, })

const Chat = mongoose.model<IChat>('Chat', ChatSchema);
export default Chat;