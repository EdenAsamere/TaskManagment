import { Request, Response } from 'express';
import { NotificationService } from '../services/notification.service';

const notificationService = new NotificationService();

export const getUserNotifications = async (req: Request, res: Response) => {
  try {
    const notifications = await notificationService.getUserNotifications(req.params.userId);
    res.status(200).json({ data: notifications });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const markAsRead = async (req: Request, res: Response) => {
  try {
    const notification = await notificationService.markAsRead(req.params.notificationId);
    res.status(200).json({ message: 'Notification marked as read', data: notification });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteNotification = async (req: Request, res: Response) => {
  try {
    await notificationService.deleteNotification(req.params.notificationId);
    res.status(200).json({ message: 'Notification deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
