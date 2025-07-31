import { Request, Response } from 'express';
import { IssueService } from '../services/issue.service';
import { AuthRequest } from '../middlewares/auth.middleware';

const issueService = new IssueService();

export const createIssue = async (req: Request, res: Response) => {
  try {
    const reportedBy = (req as AuthRequest).user?.id;
    if (!reportedBy) {
      return res.status(400).json({ message: 'User ID is required.' });
    }
    const issue = await issueService.createIssue({ ...req.body, reportedBy });
    res.status(201).json({ message: 'Issue created', data: issue });
  } catch (error) {
    let message = 'Failed to create issue';
    if (error instanceof Error) {
      message = error.message;
    }
    res.status(400).json({ message });
  }
};

export const getIssueById = async (req: Request, res: Response) => {
  try {
    const issue = await issueService.getIssueById(req.params.issueId);
    res.status(200).json({ data: issue });
  } catch (error) {
    let message = 'Issue not found';
    if (error instanceof Error) {
      message = error.message;
    }
    res.status(404).json({ message });
  }
};

export const getIssuesByTask = async (req: Request, res: Response) => {
  try {
    const issues = await issueService.getIssuesByTask(req.params.taskId);
    res.status(200).json({ data: issues });
  } catch (error) {
    let message = 'Failed to get issues by task';
    if (error instanceof Error) {
      message = error.message;
    }
    res.status(400).json({ message });
  }
};

export const getIssuesByProject = async (req: Request, res: Response) => {
  try {
    const issues = await issueService.getIssuesByProject(req.params.projectId);
    res.status(200).json({ data: issues });
  } catch (error) {
    let message = 'Failed to get issues by project';
    if (error instanceof Error) {
      message = error.message;
    }
    res.status(400).json({ message });
  }
};

export const updateIssueStatus = async (req: Request, res: Response) => {
  try {
    const issue = await issueService.updateIssueStatus(req.params.issueId, req.body.status);
    res.status(200).json({ message: 'Issue status updated', data: issue });
  } catch (error) {
    let message = 'Failed to update issue status';
    if (error instanceof Error) {
      message = error.message;
    }
    res.status(400).json({ message });
  }
};

export const assignIssue = async (req: Request, res: Response) => {
  try {
    const issue = await issueService.assignIssue(req.params.issueId, req.body.userId);
    res.status(200).json({ message: 'Issue assigned', data: issue });
  } catch (error) {
    let message = 'Failed to assign issue';
    if (error instanceof Error) {
      message = error.message;
    }
    res.status(400).json({ message });
  }
};

export const deleteIssue = async (req: Request, res: Response) => {
  try {
    const result = await issueService.deleteIssue(req.params.issueId);
    res.status(200).json(result);
  } catch (error) {
    let message = 'Failed to delete issue';
    if (error instanceof Error) {
      message = error.message;
    }
    res.status(404).json({ message });
  }
};
