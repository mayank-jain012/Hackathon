export const registrationEmailTemplate = (username) => `
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2 style="color: #333;">Welcome to Our Website, ${username}!</h2>
        <p>Thank you for registering on our website. We're excited to have you on board!</p>
        <p>If you have any questions or need support, feel free to contact us.</p>
        <p>Best regards,</p>
        <p>The Team</p>
    </div>
`;

export const loginEmailTemplate = (username) => `
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2 style="color: #333;">Login Notification</h2>
        <p>Hi ${username},</p>
        <p>We noticed a new login to your account. If this was you, you can safely ignore this email.</p>
        <p>If you did not log in, please contact our support team immediately.</p>
        <p>Best regards,</p>
        <p>The Team</p>
    </div>
`;

export const forgotPasswordContent = (firstname, otp) => `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2 style="color: #333;">Password Reset Request</h2>
        <p>Hi ${firstname},</p>
        <p>Your OTP for password reset is: <strong>${otp}</strong></p>
        <p>This OTP is valid for 15 minutes.</p>
        <p>Best regards,</p>
        <p>The Team</p>
      </div>
    `;
export const sendNotificationContent = (recipientName, message, type) => `
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
      <h2 style="color: #333;">New Notification: ${type}</h2>
      <p>Hi ${recipientName},</p>
      <p>${message}</p>
      <p>Best regards,</p>
      <p>The Team</p>
    </div>
  `;










