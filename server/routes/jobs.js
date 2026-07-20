import express from 'express';
import { createJob, getJobs, updateJob, deleteJob } from '../controllers/jobController.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.use(verifyToken);

router.post('/', createJob);
router.get('/', getJobs);
router.put('/:id', updateJob);
router.delete('/:id', deleteJob);

export default router;
