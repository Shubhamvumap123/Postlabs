import mongoose, { Document, Schema } from 'mongoose';

export interface IJob extends Document {
  user: mongoose.Types.ObjectId;
  company: string;
  position: string;
  status: 'Applied' | 'Interview' | 'Offer' | 'Rejected';
  location?: string;
  salary?: string;
  notes?: string;
  appliedDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

const jobSchema = new Schema<IJob>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    company: { type: String, required: true },
    position: { type: String, required: true },
    status: {
      type: String,
      enum: ['Applied', 'Interview', 'Offer', 'Rejected'],
      default: 'Applied',
    },
    location: { type: String },
    salary: { type: String },
    notes: { type: String },
    appliedDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model<IJob>('Job', jobSchema);
