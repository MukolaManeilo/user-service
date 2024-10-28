import { Schema, model, Document } from 'mongoose';


interface IMessage {
  senderId: string;
  content: string;
  revised: boolean;
  createdAt: Date;
}

interface IChat extends Document {
  expertId: Schema.Types.ObjectId;
  clientId: Schema.Types.ObjectId;
  messages: IMessage[];
}


const MessageSchema = new Schema<IMessage>({
  senderId: { type: String, required: true },
  content: { type: String, required: true },
  revised: { type: Boolean, required: true, default: false },
  createdAt: { type: Date, default: Date.now }
});

const ChatSchema = new Schema<IChat>({
  expertId: { type: Schema.Types.ObjectId, ref: 'Expert', required: true },
  clientId: { type: Schema.Types.ObjectId, ref: 'Client', required: true },
  messages: [MessageSchema]
}, {
  timestamps: true
});


const ChatModel = model<IChat>('Chat', ChatSchema);
export default ChatModel;
