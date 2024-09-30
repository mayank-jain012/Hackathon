import express from 'express';
import {
    createClass,
    getClassById,
    updateClass,
    deleteClass,
    getClassesAndCoursesByTeacher,
} from '../controllers/Class.controller.js'; // Adjust the import path as needed
import {
    createClassValidation,
    updateClassValidation,
    getClassValidation,
    deleteClassValidation,
} from '../middleware/validator.middleware.js'; // Adjust the import path as needed

const router = express.Router();

// Route for creating a class
router.post('/classes', createClassValidation, createClass);

// Route for getting a class by ID
router.get('/classes/:id', getClassValidation, getClassById);

// Route for updating a class
router.put('/classes/:id', updateClassValidation, updateClass);

// Route for deleting a class
router.delete('/classes/:id', deleteClassValidation, deleteClass);

// Route for getting classes and courses by teacher ID
router.get('/teachers/:teacherId/classes-and-courses', getClassesAndCoursesByTeacher);

export default router;
