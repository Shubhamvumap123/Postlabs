import mongoose from 'mongoose';

const jobApplicationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  company: { type: String, required: true },
  position: { type: String, required: true },
  status: { type: String, enum: ['Applied', 'Interview', 'Offer', 'Rejected'], default: 'Applied' },
  salary: { type: String },
  notes: { type: String },
}, { timestamps: true });

export default mongoose.model('JobApplication', jobApplicationSchema);
