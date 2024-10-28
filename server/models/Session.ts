import { Schema, model, Document } from 'mongoose';


interface ISession extends Document {
  status: string;
  expertId: Schema.Types.ObjectId;
  clientId: Schema.Types.ObjectId;
  price: number;
  taskDescription: string;
  deadline: Date;
  startDate: Date;
  endDate?: Date;
  materialLinks?: string[];
}


const SessionSchema = new Schema<ISession>({
  status: { type: String, required: true },
  expertId: { type: Schema.Types.ObjectId, ref: 'Expert', required: true },
  clientId: { type: Schema.Types.ObjectId, ref: 'Client', required: true },
  price: { type: Number, required: true },
  taskDescription: { type: String, required: true },
  deadline: { type: Date, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  materialLinks: { type: [String] }
}, {
  timestamps: true
});


const SessionModel = model<ISession>('Session', SessionSchema);
export default SessionModel;
