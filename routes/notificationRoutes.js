import express from 'express';
import { getNotification, addLikeNotification, addCommentNotification } from '../controllers/notificationController.js';

const router = express.Router();

router.get('/notifications', getNotification);
router.post('/notifications', addLikeNotification);
router.post('/notifications/comment', addCommentNotification);

export default router;