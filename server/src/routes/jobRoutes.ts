import express from 'express';
import { getJobs, addJob, updateJob, deleteJob, getJobAnalytics } from '../controllers/jobController';
import { authMiddleware } from '../middleware/auth';

const router = express.Router();

router.use(authMiddleware);

router.route('/')
  .get(getJobs)
  .post(addJob);

router.get('/analytics', getJobAnalytics);

router.route('/:id')
  .put(updateJob)
  .delete(deleteJob);

export default router;
