import express from 'express';
import {
    createCourse,
    getCoursesByStudent,
    updateCourse,
    deleteCourse,
} from '../controllers/Course.controller.js';
import {
    validateCreateCourse,
    validateUpdateCourse,
    validateGetCoursesByStudent,
    validateDeleteCourse,
} from '../middleware/validator.middleware.js'; // Adjust the import path as needed
import { authMiddleware, isAdmin } from '../middleware/auth.middleware.js';

const router = express.Router();
// Route for creating a course
router.post('/courses', authMiddleware,isAdmin,validateCreateCourse, createCourse);
// Route for getting courses by student ID
router.get('/courses/student/:studentId', validateGetCoursesByStudent, getCoursesByStudent);
// Route for updating a course
router.put('/courses/:id',authMiddleware,isAdmin, validateUpdateCourse, updateCourse);
// Route for deleting a course
router.delete('/courses/:id', authMiddleware,isAdmin,validateDeleteCourse, deleteCourse);

export default router;
