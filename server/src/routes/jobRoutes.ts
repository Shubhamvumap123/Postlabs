import express from 'express';
import { getJobs, createJob, updateJob, deleteJob } from '../controllers/jobController';
import { protect } from '../middleware/auth';

const router = express.Router();

router.route('/').get(protect, getJobs).post(protect, createJob);
router.route('/:id').put(protect, updateJob).delete(protect, deleteJob);

export default router;
