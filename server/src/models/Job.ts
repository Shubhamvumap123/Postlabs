import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  company: { type: String, required: true },
  position: { type: String, required: true },
  status: {
    type: String,
    enum: ['Applied', 'Interview', 'Offer', 'Rejected'],
    default: 'Applied'
  },
  location: { type: String, default: '' },
  dateApplied: { type: Date, default: Date.now },
  notes: { type: String, default: '' }
}, { timestamps: true });

export default mongoose.model('Job', jobSchema);
