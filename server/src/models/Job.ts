import mongoose, { Schema } from 'mongoose';

const JobSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['Applied', 'Interview', 'Offer', 'Rejected'],
    default: 'Applied',
  },
  location: {
    type: String,
  },
  appliedDate: {
    type: Date,
    default: Date.now,
  }
}, { timestamps: true });

export default mongoose.model('Job', JobSchema);
