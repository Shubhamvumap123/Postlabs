import { Request, Response } from 'express';
import Job from '../models/Job';
import { AuthRequest } from '../middleware/auth';

export const getJobs = async (req: AuthRequest, res: Response) => {
  try {
    const jobs = await Job.find({ user: req.user?.id }).sort({ appliedDate: -1 });
    res.json(jobs);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

export const addJob = async (req: AuthRequest, res: Response) => {
  try {
    const { title, company, status, location, appliedDate } = req.body;

    const newJob = new Job({
      user: req.user?.id,
      title,
      company,
      status,
      location,
      appliedDate: appliedDate || Date.now(),
    });

    const job = await newJob.save();
    res.json(job);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

export const updateJob = async (req: AuthRequest, res: Response) => {
  try {
    const { title, company, status, location, appliedDate } = req.body;

    let job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    if (job.user.toString() !== req.user?.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    job = await Job.findByIdAndUpdate(
      req.params.id,
      { $set: { title, company, status, location, appliedDate } },
      { new: true }
    );

    res.json(job);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

export const deleteJob = async (req: AuthRequest, res: Response) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    if (job.user.toString() !== req.user?.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await Job.findByIdAndDelete(req.params.id);

    res.json({ message: 'Job removed' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

export const getJobAnalytics = async (req: AuthRequest, res: Response) => {
  try {
    const stats = await Job.aggregate([
      { $match: { user: req.user?.id } },
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);
    res.json(stats);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};
