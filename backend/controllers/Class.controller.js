import Class from '../model/classSchema.js';
import User from '../model/userSchemas.js'; // Assuming you have a User model
import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiResponse} from '../utils/apiResponse.js'; // Assuming you have a custom ApiResponse class
import {ApiError} from '../utils/apiError.js'; // Assuming you have a custom ApiError class

// Create Class
export const createClass = asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new ApiError(errors.array(), "", "Validation errors", 400));
    }

    const { className, teacher, subject } = req.body;

    // Check if the teacher exists
    const teacherExists = await User.findById(teacher);
    if (!teacherExists) {
        return next(new ApiError([], "", "Teacher not found", 404));
    }

    const newClass = await Class.create({
        className,
        teacher,
        subject,
    });

    const response = new ApiResponse(newClass, 201, "Class created successfully");
    res.status(response.statusCode).json(response);
});

// Get Class by ID
export const getClassById = asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new ApiError(errors.array(), "", "Validation errors", 400));
    }

    const { id } = req.params;

    const classData = await Class.findById(id).populate('teacher students');
    if (!classData) {
        return next(new ApiError([], "", "Class not found", 404));
    }

    const response = new ApiResponse(classData, 200, "Class retrieved successfully");
    res.status(response.statusCode).json(response);
});

// Update Class
export const updateClass = asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new ApiError(errors.array(), "", "Validation errors", 400));
    }

    const { id } = req.params;
    const { className, teacher, subject } = req.body;

    const updatedClass = await Class.findByIdAndUpdate(
        id,
        { className, teacher, subject },
        { new: true, runValidators: true }
    );

    if (!updatedClass) {
        return next(new ApiError([], "", "Class not found", 404));
    }

    const response = new ApiResponse(updatedClass, 200, "Class updated successfully");
    res.status(response.statusCode).json(response);
});

// Delete Class
export const deleteClass = asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new ApiError(errors.array(), "", "Validation errors", 400));
    }

    const { id } = req.params;

    const deletedClass = await Class.findByIdAndDelete(id);
    if (!deletedClass) {
        return next(new ApiError([], "", "Class not found", 404));
    }

    const response = new ApiResponse(deletedClass, 200, "Class deleted successfully");
    res.status(response.statusCode).json(response);
});

// Get Classes and Courses for a Teacher
export const getClassesAndCoursesByTeacher = asyncHandler(async (req, res, next) => {
    const { teacherId } = req.params;

    // Find classes for the teacher
    const classes = await Class.find({ teacher: teacherId }).populate('students');
    
    // Find courses for the teacher
    const courses = await Course.find({ teacher: teacherId }).populate('classes');

    const response = {
        classes,
        courses,
    };
    
    const apiResponse = new ApiResponse(response, 200, "Classes and courses retrieved successfully");
    res.status(apiResponse.statusCode).json(apiResponse);
});
