import mongoose, {Document, Schema} from 'mongoose';


export interface IChat extends Document {
	expertId: mongoose.Types.ObjectId;
	clientId: mongoose.Types.ObjectId;
	lastMessageId: mongoose.Types.ObjectId;
}


const ChatSchema: Schema<IChat> = new Schema({
	expertId: { type: Schema.Types.ObjectId, ref: 'Expert', required: true },
	clientId: { type: Schema.Types.ObjectId, ref: 'Client', required: true },
	lastMessageId: { type: Schema.Types.ObjectId, ref: 'Message', required: true },
}, { timestamps: true, })

ChatSchema.index({ expertId: 1, clientId: 1 }, { unique: true });
ChatSchema.pre('save', function (next) {
	if (this.expertId.equals(this.clientId)) {
		return next(new Error('Expert and client IDs must be different.'));
	}
	next();
});


const Chat = mongoose.model<IChat>('Chat', ChatSchema);
export default Chat;