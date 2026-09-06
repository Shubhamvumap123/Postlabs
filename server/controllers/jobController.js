import Job from '../models/Job.js';

export const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

export const createJob = async (req, res) => {
  try {
    const { company, position, status } = req.body;
    const newJob = new Job({
      company,
      position,
      status,
      user: req.user.id
    });
    const job = await newJob.save();
    res.json(job);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

export const updateJob = async (req, res) => {
  try {
    const { company, position, status } = req.body;
    let job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });
    if (job.user.toString() !== req.user.id) return res.status(401).json({ message: 'Not authorized' });

    job = await Job.findByIdAndUpdate(req.params.id, { $set: { company, position, status } }, { new: true });
    res.json(job);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

export const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });
    if (job.user.toString() !== req.user.id) return res.status(401).json({ message: 'Not authorized' });

    await Job.findByIdAndDelete(req.params.id);
    res.json({ message: 'Job removed' });
  } catch (err) {
    res.status(500).send('Server Error');
  }
};
