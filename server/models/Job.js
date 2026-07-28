import mongoose from 'mongoose';
const jobSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  company: { type: String, required: true },
  position: { type: String, required: true },
  status: { type: String, enum: ['Applied', 'Interview', 'Offer', 'Rejected'], default: 'Applied' },
  dateApplied: { type: Date, default: Date.now }
}, { timestamps: true });
export default mongoose.models.Job || mongoose.model('Job', jobSchema);
