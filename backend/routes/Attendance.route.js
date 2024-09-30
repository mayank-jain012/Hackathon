import express from 'express';
import {
    createAttendance,
    getAttendanceByStudent,
    getAttendanceByClass,
    updateAttendance,
    deleteAttendance,
} from '../controllers/Attendance.controller.js'; // Adjust the import path as needed
import {
    validateCreateAttendance,
    validateGetAttendanceByStudent,
    validateGetAttendanceByClass,
    validateUpdateAttendance,
    validateDeleteAttendance,
} from '../middleware/validator.middleware.js'; // Adjust the import path as needed
import { authMiddleware, isAdmin, isParent, isTeacher } from '../middleware/auth.middleware.js';

const router = express.Router();

// Route for creating attendance
router.post('/attendance', authMiddleware,isTeacher,validateCreateAttendance, createAttendance);

// Route for getting attendance by student ID
router.get('/attendance/student/:studentId', validateGetAttendanceByStudent, getAttendanceByStudent);

// Route for getting attendance by class ID
router.get('/attendance/class/:classId', authMiddleware,validateGetAttendanceByClass, getAttendanceByClass);

// Route for updating attendance record
router.put('/attendance/:id', validateUpdateAttendance, updateAttendance);

// Route for deleting attendance record
router.delete('/attendance/:id', validateDeleteAttendance, deleteAttendance);

export default router;
