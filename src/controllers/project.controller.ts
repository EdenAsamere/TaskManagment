import {Request, Response} from "express";
import { AuthRequest } from "../middlewares/auth.middleware";

import { ProjectService } from "../services/project.service";

const projectService = new ProjectService();

export const createProject = async (req: Request, res: Response) => {
    try {
        const { name, description, startDate} = req.body;
        const manager = (req as AuthRequest).user?.id;
        if (!manager) {
            return res.status(400).json({ message: 'Manager ID is required.' });
        }
        const project = await projectService.createProject({
            name,
            description,
            startDate,
            manager
        });

        return res.status(201).json(project);
    } catch (error) {
        console.error('Error creating project:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


export const getProjectById = async (req: Request, res: Response) => {
    const projectId = req.params.id;
    try {
        const project = await projectService.getProjectById(projectId);
        return res.status(200).json(project);
    }
    catch (error) {
        console.error('Error fetching project:', error);
        return res.status(404).json({ message: 'Project not found' });
    }
};

export const updateProject = async (req: Request, res: Response) => {
    const projectId = req.params.id;    
    const updateData = req.body;
    try {
        const updatedProject = await projectService.updateProject(projectId, updateData);
        return res.status(200).json(updatedProject);
    } catch (error) {
        console.error('Error updating project:', error);
        return res.status(404).json({ message: 'Project not found' });
    }
};

export const deleteProject = async (req: Request, res: Response) => {
    const projectId = req.params.id;
    try {
        const result = await projectService.deleteProject(projectId);
        return res.status(200).json(result);
    } catch (error) {
        console.error('Error deleting project:', error);
        return res.status(404).json({ message: 'Project not found' });
    }
};
export const getAllPaginatedProjects = async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    try {
        const projects = await projectService.getAllPaginatedProjects(page, limit);
        return res.status(200).json(projects);
    } catch (error) {
        console.error('Error fetching projects:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const getProjectProgress = async (req: Request, res: Response) => {
    const projectId = req.params.id;
    try {
        const progress = await projectService.getProjectProgress(projectId);
        return res.status(200).json({ progress });
    }
    catch (error) {
        console.error('Error fetching project progress:', error);
        return res.status(404).json({ message: 'Project not found' });
    }
};

export const markAsCompleted = async (req: Request, res: Response) => {
    const projectId = req.params.id;
    try {
        const updatedProject = await projectService.updateProjectStatus(projectId);
        return res.status(200).json(updatedProject);
    } catch (error) {
        console.error('Error marking project as completed:', error);
        return res.status(404).json({ message: 'Project not found' });
    }
};

export const addTeamMember = async (req: Request, res: Response) => {
    const projectId = req.params.id;
    const userId = req.body.userId;
    try {
        const updatedProject = await projectService.addTeamMember(projectId, userId);
        return res.status(200).json(updatedProject);
    } catch (error) {
        console.error('Error adding team member:', error);
        return res.status(404).json({ message: 'Project not found' });
    }
};

// export const getProjectTasks = async (req: Request, res: Response) => {
//     const projectId = req.params.id;
//     try {
//         const tasks = await projectService.getTasksByProject(projectId);
//         return res.status(200).json(tasks);
//     } catch (error) {
//         console.error('Error fetching project tasks:', error);
//         return res.status(404).json({ message: 'Project not found' });
//     }
// };