import {createNotification,getAllNotifications} from '../controllers/Notification.controller.js';
import { authMiddleware, isTeacher } from '../middleware/auth.middleware.js';
import {notificationValidationRules} from '../middleware/validator.middleware.js';

import express from 'express';

const router=express.Router();
router.post('/notification',authMiddleware,isTeacher,notificationValidationRules,createNotification);
router.get('/notification/:userid',getAllNotifications);

export default router;