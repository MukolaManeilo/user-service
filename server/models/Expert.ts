
import { Schema, model, Document } from 'mongoose';

interface IExpert extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  balance: number;
  consultation: boolean;
  mentoring: boolean;
  category: string;
  subCategory?: string;
  skills: string[];
  createdAt: Date;
  rating: {
    scores: number;
    activityLog: Date[]; // Array of dates, last 50 days user was active
    responseTime: number[]; // Response times for the last 30 messages
    sessionPrice: number[]; // Prices for the last 30 sessions
  };
  reviews: {
    author: string;
    rating: number;
    text: string;
  }[];
}

const ExpertSchema = new Schema<IExpert>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  balance: { type: Number, default: 0 },
  consultation: { type: Boolean, required: true },
  mentoring: { type: Boolean, required: true },
  category: { type: String, required: true },
  subCategory: { type: String },
  skills: { type: [String], required: true },
  rating: {
    scores: { type: Number, default: 0 },
    activityLog: { type: [Date], default: [] },
    responseTime: { type: [Number], default: [] },
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

const ExpertModel = model<IExpert>('Expert', ExpertSchema);
export default ExpertModel;
