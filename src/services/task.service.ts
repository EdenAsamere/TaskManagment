import Task from '../models/task.model';
import Project from '../models/project.model';
import { Types } from 'mongoose';
import { ITask } from '../interfaces/task.interface';

export class TaskService {
  async createTask(taskData: ITask) {
    // Ensure project exists
    const project = await Project.findById(taskData.project);
    if (!project) throw new Error('Project not found');
    const task = new Task(taskData);
    return task.save();
  }

  async getTasksByProject(projectId: string) {
    // Ensure project exists
    const project = await Project.findById(projectId);
    if (!project) throw new Error('Project not found');
    const tasks = await Task.find({ project: projectId });
    console.log('Tasks retrieved:', tasks);
    return tasks;
  }

  async assignTaskToUser(taskId: string, userId: Types.ObjectId) {
    const task = await Task.findById(taskId);
    if (!task) throw new Error('Task not found');
    if (task.assignedTo && task.assignedTo.includes(userId)) {
      throw new Error('User already assigned to this task');
    }
    if(task.assignedTo && task.assignedTo?.length >= 3) {
      throw new Error('Task can only be assigned to a maximum of 3 users');
    }
    task.assignedTo?.push(userId);
    return task.save();
  }

  async updateTaskStatus(taskId: string, status: 'pending' | 'in_progress' | 'completed') {
    return Task.findByIdAndUpdate(taskId, { status }, { new: true });
  }


  async getTaskById(taskId: string) {   
    const task = await Task.findById(taskId)
        .populate('assignedTo', 'email firstName lastName')
        .populate('project', 'name');
    if (!task) {
        throw new Error('Task not found');
    }
    return task;
}
    async deleteTask(taskId: string) {
        const task = await Task.findByIdAndDelete(taskId);
        if (!task) {
            throw new Error('Task not found');
        }
        return { message: 'Task deleted successfully' };
    }
    async getAllPaginatedTasks(page: number = 1, limit: number = 10) {
        const skip = (page - 1) * limit;
        const tasks = await Task.find()
            .skip(skip)
            .limit(limit)
            .populate('assignedTo', 'firstName lastName profilePicture')
            .populate('project', 'name description status');
        return tasks;
    }  
    
    async setTaskDueDate(taskId: string, dueDate: Date) {
        const task = await Task.findById(taskId);
        if (!task) {
            throw new Error('Task not found');
        }
        if (task.startDate && dueDate < task.startDate) {
            throw new Error('Due date cannot be before start date');
        }
        task.dueDate = dueDate;
        return task.save();
    }

    async setTaskStartDate(taskId: string, startDate: Date) {
        const task = await Task.findById(taskId);   
        if (!task) {
            throw new Error('Task not found');
        }
        if (task.dueDate && startDate > task.dueDate) {
            throw new Error('Start date cannot be after due date');
        }
        task.startDate = startDate;
        return task.save();
    }
}
