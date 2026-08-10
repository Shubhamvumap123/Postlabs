const Job = require('../models/Job');

exports.getJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ user: req.user.id });
    res.json(jobs);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.createJob = async (req, res) => {
  try {
    const job = await Job.create({ ...req.body, user: req.user.id });
    res.status(201).json(job);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateJob = async (req, res) => {
  try {
    const job = await Job.findOneAndUpdate({ _id: req.params.id, user: req.user.id }, req.body, { new: true });
    res.json(job);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteJob = async (req, res) => {
  try {
    await Job.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    res.json({ message: 'Job deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
