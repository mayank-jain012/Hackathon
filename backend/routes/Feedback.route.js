import express from 'express';
import {
    createFeedback,
    getFeedbackByStudent,
    updateFeedback,
    deleteFeedback,
} from '../controllers/Feedback.Controller.js';
import {
    validateCreateFeedback,
    validateUpdateFeedback,
    validateGetFeedbackByStudent,
    validateDeleteFeedback,
} from '../middleware/validator.middleware.js'; // Adjust the import path as needed

const router = express.Router();


router.post('/feedback', validateCreateFeedback, createFeedback);


router.get('/feedback/student/:studentId', validateGetFeedbackByStudent, getFeedbackByStudent);


router.put('/feedback/:id', validateUpdateFeedback, updateFeedback);

router.delete('/feedback/:id', validateDeleteFeedback, deleteFeedback);

export default router;
