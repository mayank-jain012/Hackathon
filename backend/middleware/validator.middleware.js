import { body,checkSchema ,param} from "express-validator";
import  User  from "../model/userSchemas.js";
import Course from "../model/courseSchema.js";
import { asyncHandler } from "../utils/asyncHandler.js";
// import { upload } from './multer.middleware.js'
// auth validation start
export const registerValidation = [
    body('name')
        .notEmpty().withMessage("Name is required")
        .isString().withMessage("Name must be a string")
        .isLength({ min: 2 }).withMessage("Name must be at least 2 characters long"),
    
    body('email')
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Invalid Email")
        .custom(async (value) => {
            const user = await User.findOne({ email: value });
            if (user) {
                return Promise.reject("Email already exists");
            }
        }),

    body('password')
        .notEmpty().withMessage("Password is required")
        .isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),

    body('role')
        .notEmpty().withMessage("Role is required")
        .isIn(['Teacher', 'Student', 'Parent']).withMessage("Role must be either Teacher, Student, or Parent"),

    body('teacherId')
        .optional(),
        // .isNumeric().withMessage("Teacher ID must be a numeric value")
        // .isLength({ min: 3, max: 3 }).withMessage("Teacher ID must be exactly 3 digits"),

    body('studentId')
        .optional(),
        // .isNumeric().withMessage("Student ID must be a numeric value")
        // .isLength({ min: 3, max: 3 }).withMessage("Student ID must be exactly 3 digits"),

    body('children')
        .optional()
        .isArray().withMessage("Children must be an array of IDs")
];

export const loginValidation = [
    body("email")
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Invalid Email"),
    body("password")
        .notEmpty().withMessage("Password is required")
]
export const forgotPassword1 = [
    body("email")
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Invalid Email")
]
export const resetPassword1 = [
    body('email')
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Invalid Email"),
    body("otp")
        .notEmpty().withMessage("Otp is required"),
    body("password")
        .notEmpty().withMessage("password must be required")
        .isLength({ min: 6 }).withMessage("Password length must be atleast 6 character long")
]
export const updatepassword = [
    body('password')
        .notEmpty().withMessage("Password must be required")
        .isLength({ min: 6 }).withMessage("Password lenght must be atleast 6 character long")
]

// grade



// Validation rules for creating a grade
export const validateCreateGrade = [
    body('student').notEmpty().withMessage('Student ID is required'),
    body('class').notEmpty().withMessage('Class ID is required'),
    body('assignmentName').notEmpty().withMessage('Assignment name is required'),
    body('grade').isNumeric().withMessage('Grade must be a number'),
    body('gradeType').notEmpty().withMessage('Grade type is required'),
    body('weight').isNumeric().withMessage('Weight must be a number'),
];

// Validation rules for updating a grade
export const validateUpdateGrade = [
    param('id').isMongoId().withMessage('Invalid grade ID'),
    body('grade').optional().isNumeric().withMessage('Grade must be a number'),
    body('assignmentName').optional().notEmpty().withMessage('Assignment name is required'),
    body('gradeType').optional().notEmpty().withMessage('Grade type is required'),
    body('weight').optional().isNumeric().withMessage('Weight must be a number'),
];

// Validation rules for getting grades by student ID
export const validateGetGradesByStudent = [
    param('studentId').isMongoId().withMessage('Invalid student ID'),
];

// Validation rules for deleting a grade
export const validateDeleteGrade = [
    param('id').isMongoId().withMessage('Invalid grade ID'),
];


// Validation Rules for Attendance
export const validateCreateAttendance = [
    body('class').notEmpty().withMessage('Class ID is required'),
    body('student').notEmpty().withMessage('Student ID is required'),
    body('date').isISO8601().withMessage('Valid date is required'),
    body('status').isIn(['present', 'absent']).withMessage('Status must be present or absent'),
];

// Validation rules for getting attendance by student
export const validateGetAttendanceByStudent = [
    param('studentId').isMongoId().withMessage('Invalid student ID'),
];

// Validation rules for getting attendance by class
export const validateGetAttendanceByClass = [
    param('classId').isMongoId().withMessage('Invalid class ID'),
];

// Validation rules for updating attendance
export const validateUpdateAttendance = [
    param('id').isMongoId().withMessage('Invalid attendance ID'),
    body('status').isIn(['present', 'absent']).withMessage('Status must be present or absent'),
];

// Validation rules for deleting attendance
export const validateDeleteAttendance = [
    param('id').isMongoId().withMessage('Invalid attendance ID'),
];

// courses
export const validateCreateCourse = [
    body('name').notEmpty().withMessage('Course name is required'),
    body('description').notEmpty().withMessage('Course description is required'),
    body('teacher').notEmpty().withMessage('Teacher ID is required'),
    body('students').optional().isArray().withMessage('Students must be an array'),
    body('schedule').optional().notEmpty().withMessage('Schedule is required'),
    body('startDate').isISO8601().withMessage('Start date must be a valid date'),
    body('endDate').isISO8601().withMessage('End date must be a valid date'),
];

// Validation rules for updating a course
export const validateUpdateCourse = [
    param('id').isMongoId().withMessage('Invalid course ID'),
    body('name').optional().notEmpty().withMessage('Course name is required'),
    body('description').optional().notEmpty().withMessage('Course description is required'),
    body('teacher').optional().notEmpty().withMessage('Teacher ID is required'),
    body('students').optional().isArray().withMessage('Students must be an array'),
    body('schedule').optional().notEmpty().withMessage('Schedule is required'),
    body('startDate').optional().isISO8601().withMessage('Start date must be a valid date'),
    body('endDate').optional().isISO8601().withMessage('End date must be a valid date'),
];

// Validation rules for getting courses by student ID
export const validateGetCoursesByStudent = [
    param('studentId').isMongoId().withMessage('Invalid student ID'),
];

// Validation rules for deleting a course
export const validateDeleteCourse = [
    param('id').isMongoId().withMessage('Invalid course ID'),
];


export const createClassValidation = [
    body('className')
        .notEmpty().withMessage('Class name is required'),
    body('teacher')
        .isMongoId().withMessage('Invalid teacher ID')
        .notEmpty().withMessage('Teacher ID is required'),
    body('subject')
        .notEmpty().withMessage('Subject is required'),
];

export const updateClassValidation = [
    param('id')
        .isMongoId().withMessage('Invalid class ID'),
    body('className')
        .optional().notEmpty().withMessage('Class name must not be empty'),
    body('teacher')
        .optional()
        .isMongoId().withMessage('Invalid teacher ID'),
    body('subject')
        .optional().notEmpty().withMessage('Subject must not be empty'),
];

export const getClassValidation = [
    param('id')
        .isMongoId().withMessage('Invalid class ID'),
];

export const deleteClassValidation = [
    param('id')
        .isMongoId().withMessage('Invalid class ID'),
];



// Validation middleware
/// course

export const validateCourse = [
    body('name').notEmpty().withMessage('Course name is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('teacher').isMongoId().withMessage('A valid teacher ID is required'),
    body('schedule').notEmpty().withMessage('Schedule is required'),
    body('startDate').isISO8601().withMessage('Start date must be a valid date'),
    body('endDate').isISO8601().withMessage('End date must be a valid date'),
];

export const validateStudentId = [
    param('studentId').isMongoId().withMessage('A valid student ID is required'),
];

export const validateCourseId = [
    param('id').isMongoId().withMessage('A valid course ID is required'),
];

// feedback

export const validateCreateFeedback = [
    body('student').notEmpty().withMessage('Student ID is required'),
    body('class').notEmpty().withMessage('Class ID is required'),
    body('message').notEmpty().withMessage('Feedback message is required'),
    body('grade').notEmpty().withMessage('Grade ID is required'),
];

// Validation rules for updating feedback
export const validateUpdateFeedback = [
    param('id').isMongoId().withMessage('Invalid feedback ID'),
    body('message').optional().notEmpty().withMessage('Feedback message is required'),
];

// Validation rules for getting feedback by student ID
export const validateGetFeedbackByStudent = [
    param('studentId').isMongoId().withMessage('Invalid student ID'),
];

// Validation rules for deleting feedback
export const validateDeleteFeedback = [
    param('id').isMongoId().withMessage('Invalid feedback ID'),
];


export const notificationValidationRules = [
    body('recipient')
        .notEmpty().withMessage('Recipient ID is required')
        .isMongoId().withMessage('Invalid Recipient ID'),
    body('message')
        .notEmpty().withMessage('Message is required'),
    body('type')
        .notEmpty().withMessage('Type is required')
        .isIn(['Assignment Due', 'Grade Update', 'Attendance Issue'])
        .withMessage('Invalid notification type'),
];