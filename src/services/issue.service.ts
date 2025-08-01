import Issue, { IIssue } from '../models/issue.model';

export class IssueService {
  async createIssue(issueData: IIssue) {
    
    const issue = new Issue(issueData);
    return issue.save();
  }

  async getIssueById(issueId: string) {
    return Issue.findById(issueId)
      .populate('reportedBy', 'firstName lastName profilePicture ')
      .populate('assignedTo', 'firstName lastName profilePicture')
      .populate('task', 'name')
      .populate('project', 'name');
  }

  async getIssuesByTask(taskId: string) {
    return Issue.find({ task: taskId });
  }

  async getIssuesByProject(projectId: string) {
    return Issue.find({ project: projectId });
  }

  async updateIssueStatus(issueId: string, status: 'open' | 'in_progress' | 'resolved' | 'closed') {
    const issue = await Issue.findById(issueId);
    if (!issue) throw new Error('Issue not found');
    issue.status = status;
    if (status === 'resolved' || status === 'closed') {
      issue.resolvedAt = new Date();
    }
    return issue.save();
  }

  async assignIssue(issueId: string, userId: string) {
    const issue = await Issue.findById(issueId);
    if (!issue) throw new Error('Issue not found');
    issue.assignedTo = userId as any;
    return issue.save();
  }

  async deleteIssue(issueId: string) {
    const issue = await Issue.findByIdAndDelete(issueId);
    if (!issue) throw new Error('Issue not found');
    return { message: 'Issue deleted successfully' };
  }
}
