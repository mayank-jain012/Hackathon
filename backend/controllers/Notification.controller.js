import Notification from '../model/notificationSchema.js';
import User from '../model/userSchemas.js';
import { sendEmail } from '../utils/sendEmail.js'; 
import { getEmailTemplate } from '../utils/sendEmail.js';// Adjust the import path as needed
import {asyncHandler} from '../utils/asyncHandler.js'
import {  validationResult } from 'express-validator';
import {ApiResponse} from '../utils/apiResponse.js';
import {ApiError} from '../utils/apiError.js';


export const createNotification = asyncHandler(async (req, res, next) => {
    // Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new ApiError(errors.array(), "", "Validation Error", 400));
    }

    const { recipient, message, type } = req.body;

    // Check if the recipient exists
    const recipientUser = await User.findById(recipient);
    if (!recipientUser) {
        return next(new ApiError([], "", "Recipient not found", 404));
    }

    // Create the notification
    const notification = await Notification.create({
        recipient,
        message,
        type
    });

    // Determine recipient's email based on user type
    const recipientEmail = recipientUser.email;
    const emailTemplate = await getEmailTemplate('notifications', { recipientUser, message });

    // Send email notification
    await sendEmail(recipientEmail, emailTemplate.subject, emailTemplate.text, emailTemplate.html);

    const response = new ApiResponse(notification, 201, "Notification created and email sent successfully");
    res.status(response.statusCode).json(response);
})


// Get All Notifications
export const getAllNotifications = asyncHandler(async (req, res, next) => {
    const { userId } = req.params;

    // Check if the user exists
    const userExists = await User.findById(userId);
    if (!userExists) {
        return next(new ApiError([], "", "User not found", 404));
    }

    // Fetch notifications for the user
    const notifications = await Notification.find({ recipient: userId }).populate('recipient');

    const response = new ApiResponse(notifications, 200, "Notifications retrieved successfully");
    res.status(response.statusCode).json(response);
})