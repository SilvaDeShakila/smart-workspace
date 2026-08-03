import express from 'express';
import { createProject, deleteProject, listProjects, updateProject } from '../controllers/projectController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, listProjects);
router.post('/', protect, authorize('admin', 'manager'), createProject);
router.put('/:id', protect, authorize('admin', 'manager'), updateProject);
router.delete('/:id', protect, authorize('admin', 'manager'), deleteProject);

export default router;
