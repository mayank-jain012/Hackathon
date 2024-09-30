import Course from '../model/courseSchema.js';
import User from '../model/userSchemas.js';
import { asyncHandler } from "../utils/asyncHandler.js";
import { validationResult } from 'express-validator';
import {ApiResponse} from '../utils/apiResponse.js';
import {ApiError} from '../utils/apiError.js';

// Create Course
export const createCourse = asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new ApiError(errors.array(), "Validation Error", "Invalid course data", 400));
    }

    const { name, description, teacher, students, schedule, startDate, endDate } = req.body;

    // Check if the teacher exists
    const teacherExists = await User.findById(teacher);
    if (!teacherExists) {
        return next(new ApiError([], "", "Teacher not found", 404));
    }

    const course = await Course.create({
        name,
        description,
        teacher,
        students,
        schedule,
        startDate,
        endDate,
    });

    const response = new ApiResponse(course, 201, "Course created successfully");
    res.status(response.statusCode).json(response);
});


// Get Courses by Student
export const getCoursesByStudent = asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(new ApiError(errors.array(), "Validation Error", "Invalid student ID", 400));
        }

        const { studentId } = req.params;

        // Check if the student exists
        const studentExists = await User.findById(studentId);
        if (!studentExists) {
            return next(new ApiError([], "", "Student not found", 404));
        }

        // Find courses where the student is enrolled
        const courses = await Course.find({ students: studentId }).populate('teacher', 'firstName lastName');

        const response = new ApiResponse(courses, 200, "Courses retrieved successfully for the student");
        res.status(response.statusCode).json(response);
    });


// Update Course
export const updateCourse =asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(new ApiError(errors.array(), "Validation Error", "Invalid course data", 400));
        }

        const { id } = req.params;
        const { name, description, teacher, students, schedule, startDate, endDate } = req.body;

        const course = await Course.findByIdAndUpdate(
            id,
            { name, description, teacher, students, schedule, startDate, endDate },
            { new: true, runValidators: true }
        );

        if (!course) {
            return next(new ApiError([], "", "Course not found", 404));
        }

        const response = new ApiResponse(course, 200, "Course updated successfully");
        res.status(response.statusCode).json(response);
    })


// Delete Course
export const deleteCourse =asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(new ApiError(errors.array(), "Validation Error", "Invalid course ID", 400));
        }

        const { id } = req.params;

        const course = await Course.findByIdAndDelete(id);
        if (!course) {
            return next(new ApiError([], "", "Course not found", 404));
        }

        const response = new ApiResponse({}, 200, "Course deleted successfully");
        res.status(response.statusCode).json(response);
    })

