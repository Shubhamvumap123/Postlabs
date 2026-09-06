const mongoose = require('mongoose');

const jobSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    company: {
      type: String,
      required: [true, 'Please add a company name'],
    },
    position: {
      type: String,
      required: [true, 'Please add a position'],
    },
    status: {
      type: String,
      enum: ['Applied', 'Interview', 'Offer', 'Rejected'],
      default: 'Applied',
    },
  },
  {
    timestamps: true,
  }
);

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
