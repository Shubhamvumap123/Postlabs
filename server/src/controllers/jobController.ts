import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import Job from '../models/Job';

export const getJobs = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { status, search } = req.query;
    let query: any = { user: req.user._id };

    if (status && status !== 'all') {
      query.status = status;
    }

    if (search) {
      query.$or = [
        { company: { $regex: search, $options: 'i' } },
        { position: { $regex: search, $options: 'i' } }
      ];
    }

    const jobs = await Job.find(query).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getJobById = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const job = await Job.findOne({ _id: req.params.id, user: req.user._id });
    if (!job) {
      res.status(404).json({ message: 'Job not found' });
      return;
    }
    res.json(job);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const createJob = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { company, position, status, location, notes, dateApplied } = req.body;

    const job = await Job.create({
      user: req.user._id,
      company,
      position,
      status: status || 'Applied',
      location,
      notes,
      dateApplied: dateApplied || Date.now()
    });

    res.status(201).json(job);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const updateJob = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const job = await Job.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!job) {
      res.status(404).json({ message: 'Job not found' });
      return;
    }

    res.json(job);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteJob = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const job = await Job.findOneAndDelete({ _id: req.params.id, user: req.user._id });

    if (!job) {
      res.status(404).json({ message: 'Job not found' });
      return;
    }

    res.json({ message: 'Job removed' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getJobStats = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const stats = await Job.aggregate([
      { $match: { user: req.user._id } },
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    const formattedStats = stats.reduce((acc, curr) => {
      acc[curr._id] = curr.count;
      return acc;
    }, {});

    const defaultStats = {
      Applied: formattedStats.Applied || 0,
      Interview: formattedStats.Interview || 0,
      Offer: formattedStats.Offer || 0,
      Rejected: formattedStats.Rejected || 0,
    };

    res.json(defaultStats);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
