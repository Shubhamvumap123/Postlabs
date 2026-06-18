import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  company: {
    type: String,
    required: true
  },
  position: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Applied', 'Interview', 'Offer', 'Rejected'],
    default: 'Applied'
  },
  salary: {
    type: String
  },
  location: {
    type: String
  },
  notes: {
    type: String
  },
  dateApplied: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

const Job = mongoose.model('Job', jobSchema);
export default Job;
