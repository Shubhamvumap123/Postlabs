import { Request, Response } from 'express';
import Job from '../models/Job';

export const getJobs = async (req: Request, res: Response): Promise<void> => {
  try {
    const jobs = await Job.find({ user: (req as any).user.id }).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const getJob = async (req: Request, res: Response): Promise<void> => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      res.status(404).json({ message: 'Job not found' });
      return;
    }

    if (job.user.toString() !== (req as any).user.id) {
      res.status(401).json({ message: 'Not authorized' });
      return;
    }

    res.json(job);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const createJob = async (req: Request, res: Response): Promise<void> => {
  try {
    const newJob = new Job({
      ...req.body,
      user: (req as any).user.id,
    });

    const job = await newJob.save();
    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const updateJob = async (req: Request, res: Response): Promise<void> => {
  try {
    let job = await Job.findById(req.params.id);

    if (!job) {
      res.status(404).json({ message: 'Job not found' });
      return;
    }

    if (job.user.toString() !== (req as any).user.id) {
      res.status(401).json({ message: 'Not authorized' });
      return;
    }

    job = await Job.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    res.json(job);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const deleteJob = async (req: Request, res: Response): Promise<void> => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      res.status(404).json({ message: 'Job not found' });
      return;
    }

    if (job.user.toString() !== (req as any).user.id) {
      res.status(401).json({ message: 'Not authorized' });
      return;
    }

    await job.deleteOne();
    res.json({ message: 'Job removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const getJobStats = async (req: Request, res: Response): Promise<void> => {
  try {
    const stats = await Job.aggregate([
      { $match: { user: (req as any).user.id } },
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    const formattedStats = stats.reduce((acc, curr) => {
      acc[curr._id] = curr.count;
      return acc;
    }, { Applied: 0, Interview: 0, Offer: 0, Rejected: 0 });

    res.json(formattedStats);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
