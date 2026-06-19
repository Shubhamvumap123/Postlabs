import express from 'express';
import { getJobs, createJob, updateJob, deleteJob, showStats } from '../controllers/jobController';
import { protect } from '../middleware/auth';

const router = express.Router();

router.use(protect);

router.route('/').get(getJobs).post(createJob);
router.route('/stats').get(showStats);
router.route('/:id').patch(updateJob).delete(deleteJob);

export default router;
