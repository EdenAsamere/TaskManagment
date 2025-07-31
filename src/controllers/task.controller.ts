import { Request, Response } from 'express';
import { TaskService } from '../services/task.service';
import { ProjectService } from '../services/project.service';
import { NotificationService } from '../services/notification.service';
import { AuthRequest } from '../middlewares/auth.middleware';

const taskService = new TaskService();
const projectService = new ProjectService();
const notificationService = new NotificationService();

export const createTask = async (req: Request, res: Response) => {
  try {
    const createdBy = (req as AuthRequest).user?.id;
    if (!createdBy) {
      return res.status(400).json({ message: 'createdBy ID is required.' });
    }
    const task = await taskService.createTask({ ...req.body, createdBy: createdBy });
    res.status(201).json({ message: 'Task created', data: task });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getTasksByProject = async (req: Request, res: Response) => {
  try {
    const tasks = await taskService.getTasksByProject(req.params.projectId);
    res.status(200).json({ data: tasks });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateTaskStatus = async (req: Request, res: Response) => {
  try {
    const task = await taskService.updateTaskStatus(req.params.taskId, req.body.status);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    await projectService.updateProjectStatus(task.project.toString());
    res.status(200).json({ message: 'Task status updated', data: task });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const assignTaskToUser = async (req: Request, res: Response) => {
  try {
    const task = await taskService.assignTaskToUser(req.params.taskId, req.body.userId);
    await notificationService.createNotification({
      user: req.body.userId,
      message: `You have been assigned to task: ${task.name}`,
      type: 'assignment',
      relatedTask: task._id
    });
    res.status(200).json({ message: 'Task assigned to user', data: task });
  }
    catch (error) {
    res.status(400).json({ message: error.message });
  }
};



export const getTaskById = async (req: Request, res: Response) => {
  try {
    const task = await taskService.getTaskById(req.params.taskId);
    res.status(200).json({ data: task });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const result = await taskService.deleteTask(req.params.taskId);
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getAllPaginatedTasks = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const tasks = await taskService.getAllPaginatedTasks(page, limit);
    res.status(200).json({ data: tasks });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const setTaskDueDate = async (req: Request, res: Response) => {
  try {
    const task = await taskService.setTaskDueDate(req.params.taskId, new Date(req.body.dueDate));
    res.status(200).json({ message: 'Task due date set', data: task });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const setTaskStartDate = async (req: Request, res: Response) => {
  try {
    const task = await taskService.setTaskStartDate(req.params.taskId, new Date(req.body.startDate));
    res.status(200).json({ message: 'Task start date set', data: task });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
