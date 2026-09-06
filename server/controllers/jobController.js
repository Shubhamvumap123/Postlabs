import Job from '../models/Job.js';

export const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const createJob = async (req, res) => {
  try {
    const { company, position, status, location, notes } = req.body;
    const job = await Job.create({ user: req.user.id, company, position, status, location, notes });
    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });
    if (job.user.toString() !== req.user.id) return res.status(401).json({ message: 'Not authorized' });
    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedJob);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });
    if (job.user.toString() !== req.user.id) return res.status(401).json({ message: 'Not authorized' });
    await job.deleteOne();
    res.json({ message: 'Job removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
