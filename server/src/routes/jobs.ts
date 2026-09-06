import express from 'express';
import { createJob, getJobs, updateJob, deleteJob, getJobStats } from '../controllers/jobs';
import { authenticate } from '../middleware/auth';

const router = express.Router();
router.use(authenticate);

router.route('/').post(createJob).get(getJobs);
router.route('/stats').get(getJobStats);
router.route('/:id').patch(updateJob).delete(deleteJob);

export default router;
