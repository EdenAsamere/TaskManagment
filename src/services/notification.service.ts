import Notification from '../models/notification.model';
import { Types } from 'mongoose';

export class NotificationService {
  async createNotification({ user, message, type, relatedTask, relatedIssue }: {
    user: Types.ObjectId,
    message: string,
    type: 'assignment' | 'deadline_update' | 'status_change' | 'issue_update',
    relatedTask?: Types.ObjectId,
    relatedIssue?: Types.ObjectId
  }) {
    const notification = new Notification({ user, message, type, relatedTask, relatedIssue });
    return notification.save();
  }

  async getUserNotifications(userId: string) {
    return Notification.find({ user: userId }).sort({ createdAt: -1 });
  }

  async markAsRead(notificationId: string) {
    return Notification.findByIdAndUpdate(notificationId, { read: true }, { new: true });
  }

  async deleteNotification(notificationId: string) {
    return Notification.findByIdAndDelete(notificationId);
  }
}
