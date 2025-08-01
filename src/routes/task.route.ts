import { Router } from 'express';
import { createTask, updateTaskStatus, assignTaskToUser, getTaskById, deleteTask, getAllPaginatedTasks, setTaskDueDate, setTaskStartDate, removeTaskDueDate } from '../controllers/task.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

router.post('/create', authenticate, createTask);
router.get('/:taskId', authenticate, getTaskById);
router.delete('/:taskId', authenticate, deleteTask);
router.get('/', authenticate, getAllPaginatedTasks);
router.patch('/:taskId/status', authenticate, updateTaskStatus);
router.patch('/:taskId/assign', authenticate, assignTaskToUser);
router.patch('/:taskId/due-date', authenticate, setTaskDueDate);
router.patch('/:taskId/remove-due-date', authenticate, removeTaskDueDate)
router.patch('/:taskId/start-date', authenticate, setTaskStartDate);

export default router;
