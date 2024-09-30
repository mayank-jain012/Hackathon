import JsonWebToken from 'jsonwebtoken';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/apiError.js';
import  User  from '../model/userSchemas.js';
import bcrypt from "bcrypt";
import nodemailer from 'nodemailer';
import { ApiResponse } from '../utils/apiResponse.js';
import { validationResult } from 'express-validator';
import { generateRefreshtoken } from '../configure/refreshToken.js';
import { token } from '../configure/jwtToken.js'
import jwt from 'jsonwebtoken';
import { isValidate } from '../utils/mongodbValidate.js';
import { registrationEmailTemplate, loginEmailTemplate, forgotPasswordContent } from '../utils/emailContent.js';
import { verifyOtp, otpGeneratorAndUpdate } from '../utils/otpGenerator.js'
import { sendEmail } from '../utils/sendEmail.js';
import { getEmailTemplate } from '../utils/sendEmail.js';
import mongoose from 'mongoose';
export const registeredUser = asyncHandler(async (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return next(new ApiError(error.array(), "", "Validation Error", 400));
    }

    const { name, email, password, role, teacherId, studentId, children } = req.body;

    try {
        // Check if the user already exists
        const existedUser = await User.findOne({ email });
        if (existedUser) {
            return next(new ApiError([], "", "User already exists", 400));
        }

        // Hash the password before storing
        const hashedPassword = await bcrypt.hash(password, 10);
        const userData = {
            name,
            email,
            password: hashedPassword,
            role,
        };

        // No need for ObjectId conversion, directly assign the 3-digit ID
        if (role === 'Teacher' && teacherId) {
            userData.teacherId = teacherId; // Store the 3-digit teacherId
        } else if (role === 'Student' && studentId) {
            userData.studentId = studentId; // Store the 3-digit studentId
        } else if (role === 'Parent' && children) {
            userData.children = children; // Store the array of 3-digit child IDs
        }

        // Create the user in the database
        const user = await User.create(userData);

        // Send email notification upon successful signup
        const emailData = await getEmailTemplate('signup', { user });
        await sendEmail(email, emailData.subject, emailData.text, emailData.html);

        // Send success response
        res.status(201).json(new ApiResponse(user, 201, "User Registered Successfully"));
    } catch (error) {
        console.log(error);
        next(new ApiError([], error.stack, "An error occurred", 500));
    }
});


export const handleRefreshToken = asyncHandler(async (req, res, next) => {
    const cookie = req.cookies;
    if (!cookie?.refreshToken) {
        return next(new ApiError([], "", "Not refresh Token in cookie", 400))
    }
    const refreshToken = cookie.refreshToken;
    const user = await User.findOne({ refreshToken });
    if (!user) {
        return new ApiError([], "", "No refresh Token in db or not matched", 400)
    }
    jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
        if (err || user.id !== decoded.id) {
            return next(new ApiError([], "", "There is something wrong in refresh token"))
        }
        const accessToken = generateRefreshtoken(user?._id);
        res.json({ accessToken });
    });
})
export const loginUser = asyncHandler(async (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return next(new ApiError(error.array(), "", "Validation Error", 400));
    }

    const { email, password } = req.body;
    try {
        const findUser = await User.findOne({ email });

        if (!findUser || !(await findUser.isPasswordMatched(password))) {
            return next(new ApiError([], "", "Invalid Email or Password", 400));
        }

        const refreshToken = generateRefreshtoken(findUser?.id);
        await User.findByIdAndUpdate(findUser?.id, { refreshToken }, { new: true });

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 72 * 60 * 60 * 1000
        });

        const getToken = token(findUser?._id);
        const response = new ApiResponse({
            _id: findUser?._id,
            name: findUser?.name,
            email: findUser?.email,
            role: findUser?.role,
            token: getToken
        }, 201, "Login Successfully");

        res.status(response.statusCode).json(response);

        const emailData = getEmailTemplate('login', { findUser });
        await sendEmail(email, (await emailData).subject, (await emailData).text, (await emailData).html);
    } catch (error) {
        console.log(error);
        next(new ApiError([], error.stack, "An error occurred", 500));
    }
});

export const getAllUser = asyncHandler(async (req, res, next) => {
    try {
        const users = await User.find();
        if (!users) {
            return next(new ApiError([], "", "No users found", 404));
        }
        const response = new ApiResponse(users, 201, "All Existing Users");
        res.status(response.statusCode).json(response);
    } catch (error) {
        console.log(error);
        next(new ApiError([], error.stack, "An error occurred", 500));
    }
});
export const getAUser = asyncHandler(async (req, res, next) => {
    const id = req.params.id.trim();
    isValidate(id);
    try {
        const user = await User.findById(id);
        if (!user) {
            return next(new ApiError([], "", "User not found", 500));
        }
        const response = new ApiResponse(user, 201, "User exists");
        res.status(response.statusCode).json(response);
    } catch (error) {
        console.log(error);
        next(new ApiError([], error.stack, "An error occurred", 500));
    }
});
export const resetPassword = asyncHandler(async (req, res, next) => {
    // express validator
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return next(new ApiError(error.array(), "", "Validation Error", 402))
    }
    // collect data
    const { email, otp, password } = req.body;
    try {
        const validOtp = verifyOtp(email, otp);
        if (!validOtp) {
            return next(new ApiError([], "", "Invalid Otp or expired", 402))
        }
        // fetch mongo
        const exist = await User.findOne({ email });
        exist.password = await bcrypt.hash(password, 10);
        exist.passwordResetIn = undefined;
        await exist.save();
        const response = new ApiResponse({}, "201", "Password reset Successfully")
        res.status(response.statusCode).json(response)
    } catch (error) {
        next(new ApiError([], error.stack, "Error Occured", 501))
    }


})
export const forgotPassword = asyncHandler(async (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return next(new ApiError(error.array(), "", "Validation Error", 400))
    }
    const { email } = req.body;
    try {
        const exist = await User.findOne({ email });
        if (!exist) {
            return next(new ApiError([], "", "The user does not exist", 402))
        }

        const emailData = getEmailTemplate('forgotPassword', { exist });
        await sendEmail(email, (await emailData).subject, (await emailData).text, (await emailData).html);
        const response = new ApiResponse({}, 200, "Otp sent Successfully")
        res.status(response.statusCode).json(response);

    } catch (error) {
        next(new ApiError([], error.stack, "An Error Occurred", 501))
    }
})
export const logOut = asyncHandler(async (req, res, next) => {
    //get cookies
    const { cookies } = req.cookies;
    // check exist
    if (!cookies.refreshToken) {
        return next([], "", "No refresh token attached", 402)
    }
    const refreshToken = cookies.refreshToken;
    try {
        const user = await User.findOne({ refreshToken });
        if (!user) {
            res.clearCookie(refreshToken, {
                httpOnly: true,
                secure: true
            })
            return res.status(204).json(new ApiResponse({}, 204, "NO user found with this token"))
        }
        await User.findOneAndUpdate(refreshToken, { refreshToken: "" }, { new: true })
        res.clearCookie(refreshToken, {
            httpOnly: true,
            secure: true
        })
    } catch (error) {
        next(new ApiError([], "", "An error Occurred", 501))
    }


    // find 
    // update
    // clear

})

export const getParentStudents = asyncHandler(async (req, res, next) => {
    const { _id, role } = req.user; // Assuming `req.user` contains the authenticated user's data

    // Ensure the user is a Parent
    if (role !== 'Parent') {
        return next(new ApiError([], "", "Only parents can access this information", 403));
    }

    try {
        // Find the parent by their ID and populate the `children` field to get the associated students
        const parent = await User.findById(_id).populate('children', 'name email studentId');
        if (!parent) {
            return next(new ApiError([], "", "Parent not found", 404));
        }

        // Check if the parent has any associated children
        if (!parent.children || parent.children.length === 0) {
            return next(new ApiError([], "", "No students associated with this parent", 404));
        }

        // Return the parent's associated children (students) data
        const response = new ApiResponse(parent.children, 200, "List of students for this parent");
        res.status(response.statusCode).json(response);

    } catch (error) {
        console.log(error);
        next(new ApiError([], error.stack, "An error occurred", 500));
    }
});
export const updatePassword = asyncHandler(async (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return next(new ApiError(error.array(), "", "Validation Error", 400))
    }
    const { _id } = req.user;
    const { password } = req.body;
    isValidate(_id);

    try {
        const user = await User.findById({ _id });
        if (!user) {
            return next(new ApiError([], "", "The user does not exist or a Token does not match the database", 402))
        }
        user.password = password
        await user.save();
        const updatedData = new ApiResponse("", 200, "Password reset Successfully", 201);
        res.status(updatedData.statusCode).json(updatedData);
    } catch (error) {
        next(new ApiError([], error.stack, "An error occured", 501));
    }

})
export const adminLogin = asyncHandler(async (req, res, next) => {
    console.log("Hello world");
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return next(error.array, "", "Validation error", 501);
    }
    const { email, password } = req.body;
    try {
        const findAdmin = await User.findOne({ email });
        if (!findAdmin || !(await findAdmin.isPasswordMatched(password))) {
            next(new ApiError([], "", "Your Email and Password not be valid", 501))
        }
        const refreshToken = generateRefreshtoken(findAdmin?._id);
        await User.findByIdAndUpdate(findAdmin?._id, { refreshToken: refreshToken }, { new: true })
        res.cookie("refreshToken", refreshToken, {
            maxAge: 72 * 60 * 60 * 1000,
            httpOnly: true
        })

        const getToken = token(findAdmin?._id);
        const response = new ApiResponse({
            _id: findAdmin?._id,
            firstname: findAdmin?.firstname,
            lastname: findAdmin?.lastname,
            mobileno: findAdmin?.mobileno,
            email: findAdmin?.email,
            role: "admin",
            token: getToken
        })
        res.status(response.statusCode).json(response)
    } catch (error) {
        console.log(error)
        next(new ApiError([], error.stack, "An error occurred", 501))
    }
})

