import User from "../models/user.model";
import Project from "../models/project.model";
import Task from '../models/task.model';
import { threadId } from "worker_threads";


export class ProjectService {

    async createProject(projectData: {
        name: string;
        description?: string;
        manager: string; // User ID
        teamMembers?: string[]; // Array of User IDs
        startDate: Date;
    }) {
        const manager = await User.findById(projectData.manager);
        if (!manager) {
            throw new Error('Manager not found');
        }
        const project = new Project({
            ...projectData,
            teamMembers: [projectData.manager, ...(projectData.teamMembers || [])],
            status: "pending",
        });
        console.log('Creating project:', projectData.name);
        return project.save();
    }

    async getProjectById(projectId: string) {
        const project = await Project.findById(projectId)
            .populate('manager', 'email firstName lastName')
            .populate('teamMembers', 'email firstName lastName');

        if (!project) {
            throw new Error('Project not found');
        }
        return project;
    }
    async updateProject(projectId: string, updateData: Partial<{
        name: string;
        description?: string;
        teamMembers?: string[]; // Array of User IDs
        startDate?: Date;
    }>) {
        const project = await Project.findByIdAndUpdate(projectId, updateData, { new: true });
        if (!project) {
            throw new Error('Project not found');
        }
        return project;
    
    }
    async deleteProject(projectId: string) {
        const project = await Project.findByIdAndDelete(projectId);
        if (!project) {
            throw new Error('Project not found');
        }
        return { message: 'Project deleted successfully' };
    }

    async getAllPaginatedProjects(page: number = 1, limit: number = 10) {
        const skip = (page - 1) * limit;
        const projects = await Project.find()
            .populate('manager', 'email firstName lastName')
            .populate('teamMembers', 'email firstName lastName')
            .skip(skip)
            .limit(limit);
        return projects;
    }

  
    async getProjectProgress(projectId: string) {
      const total = await Task.countDocuments({ project: projectId });

      const completed = await Task.countDocuments({ project: projectId, status: 'completed' });
      if (total === 0) return 0;
      return Math.round((completed / total) * 100); // percentage
    }

    async addTeamMember(projectId: string, userIds: string[]) {
        const project = await Project.findById(projectId);
        if (!project) {
            throw new Error('Project not found');
        }
        userIds.forEach(userId => {
            if (!project.teamMembers.includes(userId as any)) {
                project.teamMembers.push(userId as any);
            }
        });
        await project.save();
        return project;
    }

    async updateProjectStatus(projectId: string) {
    // Get all tasks for this project
    const tasksUnderProject = await Task.find({ project: projectId });

    if (!tasksUnderProject.length) {
        // No tasks yet → project stays active
        const project = await Project.findByIdAndUpdate(
        projectId,
        { status: "pending" },
        { new: true }
        );
        if (!project) throw new Error("Project not found");
        return project;
    }

    // Check if all tasks are completed
    const allCompleted = tasksUnderProject.every(task => task.status === "completed");

    const newStatus = allCompleted ? "completed" : "in-progress";

    const project = await Project.findByIdAndUpdate(
        projectId,
        { status: newStatus },
        { new: true }
    );

    if (!project) throw new Error("Project not found");

    return project;
    }

    async setProjectDueDate(projectId: string, dueDate: Date) {
        const project = await Project.findById(projectId);
        if (!project) {
            throw new Error('Project not found');
        }
        project.deadline = dueDate;
        return project.save();
    }

   async removeProjectDueDate(projectId: string) {
    return Project.findByIdAndUpdate(
        projectId,
        { $unset: { deadline: "" } },
        { new: true }
    );
}

    // async getTasksByProject(projectId: string) {
    //     const tasks = await Task.find({ project: projectId })
    //         .populate('assignedTo', 'email firstName lastName')
    //         .populate('project', 'name description status');
    //     return tasks;
    // }

}