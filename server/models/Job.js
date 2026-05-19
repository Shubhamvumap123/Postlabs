import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: [true, 'Job title is required'],
    trim: true,
  },
  company: {
    type: String,
    required: [true, 'Company name is required'],
    trim: true,
  },
  location: {
    type: String,
    trim: true,
    default: '',
  },
  status: {
    type: String,
    enum: ['Applied', 'Interview', 'Offer', 'Rejected'],
    default: 'Applied',
  },
  category: {
    type: String,
    default: 'General',
  },
  salary: {
    type: String,
    default: '',
  },
  notes: {
    type: String,
    default: '',
  },
  applicationDate: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

const Job = mongoose.model('Job', jobSchema);

export default Job;
