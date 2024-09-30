import Attendance from '../model/attendanceSchema.js';
import User from '../model/userSchemas.js';
import Class from '../model/classSchema.js';
import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiResponse} from '../utils/apiResponse.js'; // Assuming you have a custom ApiResponse class
import {ApiError} from '../utils/apiError.js'; // Assuming you have a custom ApiError class

export const createAttendance = asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new ApiError(errors.array(), "", "Validation errors", 400));
    }

    const { class: classId, student, date, status } = req.body;

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

    const attendance = await Attendance.create({
        class: classId,
        student,
        date,
        status
    });

    const response = new ApiResponse(attendance, 201, "Attendance record created successfully");
    res.status(response.statusCode).json(response);
});

// Get Attendance by Student
export const getAttendanceByStudent = asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new ApiError(errors.array(), "", "Validation errors", 400));
    }

    const { studentId } = req.params;

    // Check if the student exists
    const studentExists = await User.findById(studentId);
    if (!studentExists) {
        return next(new ApiError([], "", "Student not found", 404));
    }

    const attendanceRecords = await Attendance.find({ student: studentId }).populate('class');

    const response = new ApiResponse(attendanceRecords, 200, "Attendance records retrieved successfully");
    res.status(response.statusCode).json(response);
});

// Get Attendance by Class
export const getAttendanceByClass = asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new ApiError(errors.array(), "", "Validation errors", 400));
    }

    const { classId } = req.params;

    // Check if the class exists
    const classExists = await Class.findById(classId);
    if (!classExists) {
        return next(new ApiError([], "", "Class not found", 404));
    }

    const attendanceRecords = await Attendance.find({ class: classId }).populate('student');

    const response = new ApiResponse(attendanceRecords, 200, "Attendance records retrieved successfully");
    res.status(response.statusCode).json(response);
});


// Update Attendance Record
export const updateAttendance = asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new ApiError(errors.array(), "", "Validation errors", 400));
    }

    const { id } = req.params; // Attendance ID to update
    const { status } = req.body;

    const attendanceRecord = await Attendance.findByIdAndUpdate(
        id,
        { status },
        { new: true, runValidators: true }
    );

    if (!attendanceRecord) {
        return next(new ApiError([], "", "Attendance record not found", 404));
    }

    const response = new ApiResponse(attendanceRecord, 200, "Attendance record updated successfully");
    res.status(response.statusCode).json(response);
});

// Delete Attendance Record
export const deleteAttendance = asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new ApiError(errors.array(), "", "Validation errors", 400));
    }

    const { id } = req.params; // Attendance ID to delete

    const attendanceRecord = await Attendance.findByIdAndDelete(id);

    if (!attendanceRecord) {
        return next(new ApiError([], "", "Attendance record not found", 404));
    }

    const response = new ApiResponse(attendanceRecord, 200, "Attendance record deleted successfully");
    res.status(response.statusCode).json(response);
});
