import { Schema, model, Document } from 'mongoose';

interface IClient extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  balance: number;
  rating: {
    scores: number;
    activityLog: Date[]; // Array of dates, last 50 days user was active
    sessionPrice: number[]; // Prices for the last 20 sessions
  };
  reviews: {
    author: string;
    rating: number;
    text: string;
  }[];
}


const ClientSchema = new Schema<IClient>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  balance: { type: Number, default: 0 },
  rating: {
    scores: { type: Number, default: 0 },
    activityLog: { type: [Date], default: [] },
    sessionPrice: { type: [Number], default: [] }
  },
  reviews: [{
    author: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    text: { type: String, required: true }
  }]
}, {
  timestamps: true
});


const ClientModel = model<IClient>('Client', ClientSchema);
export default ClientModel;
