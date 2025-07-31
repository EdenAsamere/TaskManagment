import { Router } from 'express';
import { createIssue, getIssueById, getIssuesByTask, getIssuesByProject, updateIssueStatus, assignIssue, deleteIssue } from '../controllers/issue.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

router.post('/', authenticate, createIssue);
router.get('/:issueId', authenticate, getIssueById);
router.get('/task/:taskId', authenticate, getIssuesByTask);
router.get('/project/:projectId', authenticate, getIssuesByProject);
router.patch('/:issueId/status', authenticate, updateIssueStatus);
router.patch('/:issueId/assign', authenticate, assignIssue);
router.delete('/:issueId', authenticate, deleteIssue);

export default router;
