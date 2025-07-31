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
    res.status(400).json({ message: error.message });
  }
};

export const getIssueById = async (req: Request, res: Response) => {
  try {
    const issue = await issueService.getIssueById(req.params.issueId);
    res.status(200).json({ data: issue });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getIssuesByTask = async (req: Request, res: Response) => {
  try {
    const issues = await issueService.getIssuesByTask(req.params.taskId);
    res.status(200).json({ data: issues });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getIssuesByProject = async (req: Request, res: Response) => {
  try {
    const issues = await issueService.getIssuesByProject(req.params.projectId);
    res.status(200).json({ data: issues });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateIssueStatus = async (req: Request, res: Response) => {
  try {
    const issue = await issueService.updateIssueStatus(req.params.issueId, req.body.status);
    res.status(200).json({ message: 'Issue status updated', data: issue });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const assignIssue = async (req: Request, res: Response) => {
  try {
    const issue = await issueService.assignIssue(req.params.issueId, req.body.userId);
    res.status(200).json({ message: 'Issue assigned', data: issue });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteIssue = async (req: Request, res: Response) => {
  try {
    const result = await issueService.deleteIssue(req.params.issueId);
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
