import { Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware';
import JobApplication from '../models/JobApplication';

export const getJobs = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = typeof req.user === 'object' && req.user !== null && 'userId' in req.user ? req.user.userId : null;
    const jobs = await JobApplication.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json(jobs);
  } catch (_error) {
    res.status(500).json({ message: 'Error fetching jobs' });
  }
};

export const createJob = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { company, position, status, salary, notes } = req.body;
    const userId = typeof req.user === 'object' && req.user !== null && 'userId' in req.user ? req.user.userId : null;
    const newJob = await JobApplication.create({
      userId,
      company,
      position,
      status,
      salary,
      notes,
    });
    res.status(201).json(newJob);
  } catch (_error) {
    res.status(500).json({ message: 'Error creating job application' });
  }
};

export const updateJob = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = typeof req.user === 'object' && req.user !== null && 'userId' in req.user ? req.user.userId : null;
    const updatedJob = await JobApplication.findOneAndUpdate(
      { _id: id, userId },
      req.body,
      { new: true }
    );
    if (!updatedJob) {
      res.status(404).json({ message: 'Job not found' });
      return;
    }
    res.status(200).json(updatedJob);
  } catch (_error) {
    res.status(500).json({ message: 'Error updating job application' });
  }
};

export const deleteJob = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = typeof req.user === 'object' && req.user !== null && 'userId' in req.user ? req.user.userId : null;
    const deletedJob = await JobApplication.findOneAndDelete({ _id: id, userId });
    if (!deletedJob) {
      res.status(404).json({ message: 'Job not found' });
      return;
    }
    res.status(200).json({ message: 'Job deleted successfully' });
  } catch (_error) {
    res.status(500).json({ message: 'Error deleting job application' });
  }
};
