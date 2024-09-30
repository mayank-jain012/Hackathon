import Feedback from '../model/feedbackSchema.js';
import User from '../model/userSchemas.js';
import Class from '../model/classSchema.js';
import Grade from '../model/gradeSchema.js';
import asyncHandler from 'express-async-handler';
import { validationResult } from 'express-validator';
import {ApiResponse} from '../utils/apiResponse.js';
import {ApiError} from '../utils/apiError.js';

// Create Feedback
export const createFeedback = asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(new ApiError(errors.array(), "Validation Error", "Invalid feedback data", 400));
        }

        const { student, class: classId, message, grade } = req.body;

        // Check if the student exists
        const studentExists = await User.findById(student);
        if (!studentExists) {
            return next(new ApiError([], "", "Student not found", 404));
        }

        // Check if the class exists
        const classExists = await Class.findById(classId);
        if (!classExists) {
            return next(new ApiError([], "", "Class not found", 404));
        }

        // Check if the grade exists
        const gradeExists = await Grade.findById(grade);
        if (!gradeExists) {
            return next(new ApiError([], "", "Grade not found", 404));
        }

        const feedback = await Feedback.create({
            student,
            class: classId,
            message,
            grade,
        });

        const response = new ApiResponse(feedback, 201, "Feedback created successfully");
        res.status(response.statusCode).json(response);
    });


// Get Feedback by Student
export const getFeedbackByStudent = asyncHandler(async (req, res, next) => {
        const { studentId } = req.params;

        // Check if the student exists
        const studentExists = await User.findById(studentId);
        if (!studentExists) {
            return next(new ApiError([], "", "Student not found", 404));
        }

        const feedbackRecords = await Feedback.find({ student: studentId }).populate('class grade');

        const response = new ApiResponse(feedbackRecords, 200, "Feedback records retrieved successfully");
        res.status(response.statusCode).json(response);
    })


// Update Feedback
export const updateFeedback = asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(new ApiError(errors.array(), "Validation Error", "Invalid feedback data", 400));
        }

        const { id } = req.params;
        const { message } = req.body;

        const feedbackRecord = await Feedback.findByIdAndUpdate(
            id,
            { message },
            { new: true, runValidators: true }
        );

        if (!feedbackRecord) {
            return next(new ApiError([], "", "Feedback record not found", 404));
        }

        const response = new ApiResponse(feedbackRecord, 200, "Feedback updated successfully");
        res.status(response.statusCode).json(response);
    });


// Delete Feedback
export const deleteFeedback = asyncHandler(async (req, res, next) => {
        const { id } = req.params;

        const feedbackRecord = await Feedback.findByIdAndDelete(id);
        if (!feedbackRecord) {
            return next(new ApiError([], "", "Feedback record not found", 404));
        }

        const response = new ApiResponse({}, 200, "Feedback deleted successfully");
        res.status(response.statusCode).json(response);
    });

