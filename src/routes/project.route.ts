import { Router } from 'express';
import { createProject, getProjectById, getAllPaginatedProjects, updateProject, deleteProject, getProjectProgress, setProjectDueDate, removeProjectDueDate } from '../controllers/project.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { getTasksByProject } from '../controllers/task.controller';

const router = Router();

router.post('/create', authenticate, createProject);
router.get('/:id', authenticate, getProjectById);
router.get('/', authenticate, getAllPaginatedProjects);
router.get('/:id/tasks', authenticate, getTasksByProject); // Assuming this is to get tasks by project
router.put('/:id', authenticate, updateProject);
router.get('/:id/progress', authenticate, getProjectProgress);
router.patch('/:projectId/due-date', authenticate, setProjectDueDate)
router.patch('/:projectId/remove-due-date', authenticate, removeProjectDueDate)
router.delete('/:id', deleteProject);

export default router;
