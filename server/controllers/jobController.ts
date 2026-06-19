import { Request, Response } from 'express';
import Job from '../models/Job';

interface AuthRequest extends Request {
  user?: any;
}

export const getJobs = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { search, status, sort } = req.query;

    const queryObject: any = {
      user: req.user._id,
    };

    if (search) {
      queryObject.position = { $regex: search as string, $options: 'i' };
    }

    if (status && status !== 'all') {
      queryObject.status = status;
    }

    let result = Job.find(queryObject);

    if (sort === 'latest') {
      result = result.sort('-createdAt');
    }
    if (sort === 'oldest') {
      result = result.sort('createdAt');
    }
    if (sort === 'a-z') {
      result = result.sort('position');
    }
    if (sort === 'z-a') {
      result = result.sort('-position');
    }

    const jobs = await result;

    res.status(200).json({ jobs, totalJobs: jobs.length });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const createJob = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { company, position, status, workLocation, jobType } = req.body;

    if (!company || !position) {
      res.status(400).json({ message: 'Please provide all values' });
      return;
    }

    req.body.user = req.user._id;

    const job = await Job.create(req.body);

    res.status(201).json({ job });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateJob = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const job = await Job.findOne({ _id: id });

    if (!job) {
      res.status(404).json({ message: `No job with id: ${id}` });
      return;
    }

    if (job.user.toString() !== req.user._id.toString()) {
      res.status(401).json({ message: 'Not authorized to access this route' });
      return;
    }

    const updatedJob = await Job.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ job: updatedJob });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteJob = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const job = await Job.findOne({ _id: id });

    if (!job) {
      res.status(404).json({ message: `No job with id: ${id}` });
      return;
    }

    if (job.user.toString() !== req.user._id.toString()) {
      res.status(401).json({ message: 'Not authorized to access this route' });
      return;
    }

    await job.deleteOne();

    res.status(200).json({ message: 'Success! Job removed' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const showStats = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    let stats = await Job.aggregate([
      { $match: { user: req.user._id } },
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]);

    const statsObj = stats.reduce((acc: any, curr: any) => {
      const { _id: title, count } = curr;
      acc[title] = count;
      return acc;
    }, {});

    const defaultStats = {
      Applied: statsObj.Applied || 0,
      Interview: statsObj.Interview || 0,
      Offer: statsObj.Offer || 0,
      Rejected: statsObj.Rejected || 0,
    };

    res.status(200).json({ defaultStats });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
