import { Router } from 'express';
import { getUserNotifications, markAsRead, deleteNotification } from '../controllers/notification.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

router.get('/user/:userId', authenticate, getUserNotifications);
router.patch('/:notificationId/read', authenticate, markAsRead);
router.delete('/:notificationId', authenticate, deleteNotification);

export default router;
