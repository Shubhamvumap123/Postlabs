import Job from '../models/Job.js';

export const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ userId: req.user.id }).sort({ dateApplied: -1 });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const createJob = async (req, res) => {
  try {
    const { company, position, status } = req.body;
    const job = await Job.create({ company, position, status, userId: req.user.id });
    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateJob = async (req, res) => {
  try {
    const { company, position, status } = req.body;
    const job = await Job.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { company, position, status },
      { new: true, runValidators: true }
    );
    if (!job) return res.status(404).json({ message: 'Job not found' });
    res.json(job);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteJob = async (req, res) => {
  try {
    const job = await Job.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!job) return res.status(404).json({ message: 'Job not found' });
    res.json({ message: 'Job removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
