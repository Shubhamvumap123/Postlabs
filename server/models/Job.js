import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  status: {
    type: String,
    enum: ['Applied', 'Interview', 'Offer', 'Rejected'],
    default: 'Applied'
  },
  location: { type: String },
  notes: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, {
  timestamps: true
});

// PERFORMANCE: Add compound index for the frequent getJobs query which filters by user and sorts by createdAt (-1).
// This changes the query from an O(N) collection scan + in-memory sort to an O(log N) index lookup.
jobSchema.index({ user: 1, createdAt: -1 });

export default mongoose.model('Job', jobSchema);
