import Job from '../models/Job.js';

export const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createJob = async (req, res) => {
  try {
    const { company, position, status, salary, location, notes } = req.body;

    const job = new Job({
      user: req.user._id,
      company,
      position,
      status,
      salary,
      location,
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

    if (job) {
      if (job.user.toString() !== req.user._id.toString()) {
        return res.status(401).json({ message: 'Not authorized to update this job' });
      }

      job.company = req.body.company || job.company;
      job.position = req.body.position || job.position;
      job.status = req.body.status || job.status;
      job.salary = req.body.salary || job.salary;
      job.location = req.body.location || job.location;
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

    if (job) {
      if (job.user.toString() !== req.user._id.toString()) {
        return res.status(401).json({ message: 'Not authorized to delete this job' });
      }

      await job.deleteOne();
      res.json({ message: 'Job removed' });
    } else {
      res.status(404).json({ message: 'Job not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
