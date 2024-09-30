import express from 'express';
import {
    createGrade,
    getAllGrades,
    getGradesByStudent,
    updateGrade,
    deleteGrade,
    getChildrenGrades,
} from '../controllers/Grades.controller.js';
import {
    validateCreateGrade,
    validateUpdateGrade,
    validateGetGradesByStudent,
    validateDeleteGrade,
} from '../middleware/validator.middleware.js'; // Adjust the import path as needed
import { authMiddleware, isTeacher } from '../middleware/auth.middleware.js';

const router = express.Router();
router.post('/grades',authMiddleware, isTeacher, validateCreateGrade, createGrade);
router.get('/grades', getAllGrades);
router.get('/grades/student/:studentId', validateGetGradesByStudent, getGradesByStudent);
router.put('/grades/:id', authMiddleware,isTeacher, validateUpdateGrade, updateGrade);
router.delete('/grades/:id', authMiddleware,isTeacher, validateDeleteGrade, deleteGrade);
router.get('/grades/children', getChildrenGrades); // Assuming you have a middleware for authentication

export default router;
