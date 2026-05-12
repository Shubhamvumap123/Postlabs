import { Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware';
import JobApplication from '../models/JobApplication';

export const getJobs = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const jobs = await JobApplication.find({ userId: req.user.userId }).sort({ createdAt: -1 });
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching jobs' });
  }
};

export const createJob = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { company, position, status, salary, notes } = req.body;
    const newJob = await JobApplication.create({
      userId: req.user.userId,
      company,
      position,
      status,
      salary,
      notes,
    });
    res.status(201).json(newJob);
  } catch (error) {
    res.status(500).json({ message: 'Error creating job application' });
  }
};

export const updateJob = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updatedJob = await JobApplication.findOneAndUpdate(
      { _id: id, userId: req.user.userId },
      req.body,
      { new: true }
    );
    if (!updatedJob) {
      res.status(404).json({ message: 'Job not found' });
      return;
    }
    res.status(200).json(updatedJob);
  } catch (error) {
    res.status(500).json({ message: 'Error updating job application' });
  }
};

export const deleteJob = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const deletedJob = await JobApplication.findOneAndDelete({ _id: id, userId: req.user.userId });
    if (!deletedJob) {
      res.status(404).json({ message: 'Job not found' });
      return;
    }
    res.status(200).json({ message: 'Job deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting job application' });
  }
};
