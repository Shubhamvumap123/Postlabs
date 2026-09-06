import Job from '../models/Job.js';

export const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ user: req.user._id });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (job && job.user.toString() === req.user._id.toString()) {
      res.json(job);
    } else {
      res.status(404).json({ message: 'Job not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createJob = async (req, res) => {
  try {
    const { company, position, status, location, jobType, notes } = req.body;
    const job = new Job({
      user: req.user._id,
      company,
      position,
      status,
      location,
      jobType,
      notes
    });
    const createdJob = await job.save();
    res.status(201).json(createdJob);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (job && job.user.toString() === req.user._id.toString()) {
      job.company = req.body.company || job.company;
      job.position = req.body.position || job.position;
      job.status = req.body.status || job.status;
      job.location = req.body.location || job.location;
      job.jobType = req.body.jobType || job.jobType;
      job.notes = req.body.notes || job.notes;
      const updatedJob = await job.save();
      res.json(updatedJob);
    } else {
      res.status(404).json({ message: 'Job not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (job && job.user.toString() === req.user._id.toString()) {
      await Job.deleteOne({ _id: job._id });
      res.json({ message: 'Job removed' });
    } else {
      res.status(404).json({ message: 'Job not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
