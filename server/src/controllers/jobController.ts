import { Response } from 'express';
import Job from '../models/Job';
import { AuthRequest } from '../middleware/auth';

export const getJobs = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const jobs = await Job.find({ userId: req.user?.id }).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const createJob = async (req: AuthRequest, res: Response): Promise<void> => {
  const { company, position, status, location } = req.body;
  try {
    const job = await Job.create({
      userId: req.user?.id,
      company,
      position,
      status: status || 'Applied',
      location,
    });
    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const updateJob = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      res.status(404).json({ message: 'Job not found' });
      return;
    }
    if (job.userId.toString() !== req.user?.id) {
      res.status(401).json({ message: 'User not authorized' });
      return;
    }
    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedJob);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const deleteJob = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      res.status(404).json({ message: 'Job not found' });
      return;
    }
    if (job.userId.toString() !== req.user?.id) {
      res.status(401).json({ message: 'User not authorized' });
      return;
    }
    await Job.deleteOne({ _id: req.params.id });
    res.json({ id: req.params.id });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
