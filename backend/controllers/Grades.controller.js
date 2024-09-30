import { asyncHandler } from "../utils/asyncHandler.js";
import Grade from '../model/gradeSchema.js';
import {ApiResponse} from '../utils/apiResponse.js';
import {ApiError} from '../utils/apiError.js'

// Create a new grade
export const createGrade = asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new ApiError(errors.array(), "", "Validation errors", 400));
    }

    const { student, class: classId, assignmentName, grade, gradeType, weight } = req.body;

    try {
        const newGrade = await Grade.create({
            student,
            class: classId,
            assignmentName,
            grade,
            gradeType,
            weight,
        });

        const response = new ApiResponse(newGrade, 201, "Grade created successfully");
        res.status(response.statusCode).json(response);
    } catch (error) {
        next(new ApiError([], error.message, "An error occurred while creating the grade", 500));
    }
});
// Get all grades
export const getAllGrades = asyncHandler(async (req, res, next) => {
    try {
        const grades = await Grade.find()
            .populate('student class', 'firstName lastName className') // Adjust to show relevant fields
            .exec();
        const response = new ApiResponse(grades, 200, "All grades retrieved successfully");
        res.status(response.statusCode).json(response);
    } catch (error) {
        next(new ApiError([], error.message, "An error occurred while fetching grades", 500));
    }
});
// Get grades for a specific student
export const getGradesByStudent = asyncHandler(async (req, res, next) => {
    const { studentId } = req.params;

    try {
        const grades = await Grade.find({ student: studentId })
            .populate('class', 'className')
            .exec();

        if (grades.length === 0) {
            return next(new ApiError([], "", "No grades found for this student", 404));
        }
        const response = new ApiResponse(grades, 200, "Grades retrieved successfully");
        res.status(response.statusCode).json(response);
    } catch (error) {
        next(new ApiError([], error.message, "An error occurred while fetching grades", 500));
    }
});
// Update a grade
export const updateGrade = asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new ApiError(errors.array(), "", "Validation errors", 400));
    }

    const { id } = req.params;
    const { grade, assignmentName, gradeType, weight } = req.body;

    try {
        const updatedGrade = await Grade.findByIdAndUpdate(
            id,
            { grade, assignmentName, gradeType, weight },
            { new: true, runValidators: true }
        );

        if (!updatedGrade) {
            return next(new ApiError([], "", "Grade not found", 404));
        }

        const response = new ApiResponse(updatedGrade, 200, "Grade updated successfully");
        res.status(response.statusCode).json(response);
    } catch (error) {
        next(new ApiError([], error.message, "An error occurred while updating the grade", 500));
    }
});
// Delete a grade
export const deleteGrade = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    try {
        const deletedGrade = await Grade.findByIdAndDelete(id);
        if (!deletedGrade) {
            return next(new ApiError([], "", "Grade not found", 404));
        }

        const response = new ApiResponse({}, 200, "Grade deleted successfully");
        res.status(response.statusCode).json(response);
    } catch (error) {
        next(new ApiError([], error.message, "An error occurred while deleting the grade", 500));
    }
});
// Get Grades of Children for Parent
export const getChildrenGrades = asyncHandler(async (req, res, next) => {
    const parentId = req.user.id; // Assuming you have user ID from the authenticated token

    // Find the parent to get their children
    const parent = await User.findById(parentId).populate('children'); // Populate to get children's info
    if (!parent) {
        return next(new ApiError([], "", "Parent not found", 404));
    }

    // Get all grades for the children
    const grades = await Grade.find({ student: { $in: parent.children } }).populate('class'); // Populate class details if needed

    // Format the response if necessary
    const formattedGrades = grades.map(grade => ({
        assignmentName: grade.assignmentName,
        grade: grade.grade,
        gradeType: grade.gradeType,
        weight: grade.weight,
        class: grade.class // You can customize this further to include specific fields
    }));

    const response = new ApiResponse(formattedGrades, 200, "Children's grades retrieved successfully");
    res.status(response.statusCode).json(response);
});

