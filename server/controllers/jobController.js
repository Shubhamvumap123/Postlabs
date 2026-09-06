const Job = require('../models/Job');

exports.getJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addJob = async (req, res) => {
  const { company, position, status } = req.body;
  try {
    const job = await Job.create({ user: req.user._id, company, position, status });
    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });
    if (job.user.toString() !== req.user._id.toString()) return res.status(401).json({ message: 'Not authorized' });

    const { company, position, status } = req.body;
    const updatedJob = await Job.findByIdAndUpdate(req.params.id, { company, position, status }, { new: true });
    res.json(updatedJob);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });
    if (job.user.toString() !== req.user._id.toString()) return res.status(401).json({ message: 'Not authorized' });

    await job.deleteOne();
    res.json({ message: 'Job removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
