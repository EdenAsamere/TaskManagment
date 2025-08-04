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
    const  project  = req.params.id;
    if (!createdBy) {
      return res.status(400).json({ message: 'createdBy ID is required.' });
    }
    if (!project) {
      return res.status(400).json({ message: 'Project ID is required.' });
    }
    const task = await taskService.createTask({ ...req.body, createdBy });
    console.log('Task created:', task.project);
    res.status(201).json({ message: 'Task created', data: task });
  } catch (error) {
    let message = 'Failed to create task';
    if (error instanceof Error) {
      message = error.message;
    }
    res.status(400).json({ message });
  }
};

export const getTasksByProject = async (req: Request, res: Response) => {
  try {
    const tasks = await taskService.getTasksByProject(req.params.id);
    res.status(200).json({ data: tasks });
  } catch (error) {
    let message = 'Failed to get tasks by project';
    if (error instanceof Error) {
      message = error.message;
    }
    res.status(400).json({ message });
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
    let message = 'Failed to update task status';
    if (error instanceof Error) {
      message = error.message;
    }
    res.status(400).json({ message });
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
    let message = 'Failed to assign task to user';
    if (error instanceof Error) {
      message = error.message;
    }
    res.status(400).json({ message });
  }
};



export const getTaskById = async (req: Request, res: Response) => {
  try {
    const task = await taskService.getTaskById(req.params.taskId);
    res.status(200).json({ data: task });
  } catch (error) {
    let message = 'Task not found';
    if (error instanceof Error) {
      message = error.message;
    }
    res.status(404).json({ message });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const result = await taskService.deleteTask(req.params.taskId);
    res.status(200).json(result);
  } catch (error) {
    let message = 'Failed to delete task';
    if (error instanceof Error) {
      message = error.message;
    }
    res.status(404).json({ message });
  }
};

export const getAllPaginatedTasks = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const tasks = await taskService.getAllPaginatedTasks(page, limit);
    res.status(200).json({ data: tasks });
  } catch (error) {
    let message = 'Failed to get paginated tasks';
    if (error instanceof Error) {
      message = error.message;
    }
    res.status(400).json({ message });
  }
};

export const setTaskDueDate = async (req: Request, res: Response) => {
  try {
    const task = await taskService.setTaskDueDate(req.params.taskId, new Date(req.body.dueDate));
    res.status(200).json({ message: 'Task due date set', data: task });
  } catch (error) {
    let message = 'Failed to set task due date';
    if (error instanceof Error) {
      message = error.message;
    }
    res.status(400).json({ message });
  }
};

export const removeTaskDueDate = async(req:Request, res:Response) =>{
  const taskId = req.params.taskId
  try{
    await taskService.removeTaskDueDate(taskId)
    res.status(200).json({message:'Task due date removed'})
  }
  catch (error) {
    let message = 'Failed to remove task due date';
    if (error instanceof Error) {
      message = error.message;
    }
    res.status(400).json({ message });
  }


}

export const setTaskStartDate = async (req: Request, res: Response) => {
  try {
    const task = await taskService.setTaskStartDate(req.params.taskId, new Date(req.body.startDate));
    res.status(200).json({ message: 'Task start date set', data: task });
  } catch (error) {
    let message = 'Failed to set task start date';
    if (error instanceof Error) {
      message = error.message;
    }
    res.status(400).json({ message });
  }
};
