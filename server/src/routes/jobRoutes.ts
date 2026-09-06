import express from 'express';
import { getJobs, getJob, createJob, updateJob, deleteJob, getJobStats } from '../controllers/jobController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.use(authenticate);

router.get('/stats', getJobStats);
router.route('/').get(getJobs).post(createJob);
router.route('/:id').get(getJob).patch(updateJob).delete(deleteJob);

export default router;
