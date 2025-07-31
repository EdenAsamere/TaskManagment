import { Request, Response } from 'express';
import { NotificationService } from '../services/notification.service';

const notificationService = new NotificationService();

export const getUserNotifications = async (req: Request, res: Response) => {
  try {
    const notifications = await notificationService.getUserNotifications(req.params.userId);
    res.status(200).json({ data: notifications });
  } catch (error) {
    let message = 'Failed to get notifications';
    if (error instanceof Error) {
      message = error.message;
    }
    res.status(400).json({ message });
  }
};

export const markAsRead = async (req: Request, res: Response) => {
  try {
    const notification = await notificationService.markAsRead(req.params.notificationId);
    res.status(200).json({ message: 'Notification marked as read', data: notification });
  } catch (error) {
    let message = 'Failed to mark notification as read';
    if (error instanceof Error) {
      message = error.message;
    }
    res.status(400).json({ message });
  }
};

export const deleteNotification = async (req: Request, res: Response) => {
  try {
    await notificationService.deleteNotification(req.params.notificationId);
    res.status(200).json({ message: 'Notification deleted' });
  } catch (error) {
    let message = 'Failed to delete notification';
    if (error instanceof Error) {
      message = error.message;
    }
    res.status(400).json({ message });
  }
};
