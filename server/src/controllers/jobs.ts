import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import Job from '../models/Job';

export const createJob = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const job = await Job.create({ ...req.body, userId: req.user!.userId });
    res.status(201).json(job);
  } catch (err) {
    res.status(500).json({ message: 'Error creating job', error: err });
  }
};

export const getJobs = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { status, search } = req.query;
    const query: any = { userId: req.user!.userId };
    if (status) query.status = status;
    if (search) query.company = { $regex: search, $options: 'i' };

    const jobs = await Job.find(query).sort('-createdAt');
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching jobs', error: err });
  }
};

export const updateJob = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const job = await Job.findOneAndUpdate(
      { _id: req.params.id, userId: req.user!.userId },
      req.body,
      { new: true, runValidators: true }
    );
    if (!job) { res.status(404).json({ message: 'Job not found' }); return; }
    res.json(job);
  } catch (err) {
    res.status(500).json({ message: 'Error updating job', error: err });
  }
};

export const deleteJob = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const job = await Job.findOneAndDelete({ _id: req.params.id, userId: req.user!.userId });
    if (!job) { res.status(404).json({ message: 'Job not found' }); return; }
    res.json({ message: 'Job deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting job', error: err });
  }
};

import mongoose from 'mongoose';

export const getJobStats = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const stats = await Job.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(req.user!.userId) } },
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);
    res.json(stats);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching stats', error: err });
  }
};
