import nodemailer from 'nodemailer';
import { otpGeneratorAndUpdate } from './otpGenerator.js';
import { forgotPasswordContent, loginEmailTemplate, registrationEmailTemplate } from './emailContent.js';
export const sendEmail = async (to, subject, text, html) => {
  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      port: 465,
      secure: true,
      auth: {
        user: "mayankjain12feb@gmail.com",
        pass: process.env.EMAIL_PASSWORD||"dyqb tszc somg bwsv"
      }
    });
    
      const info = await transporter.sendMail({
        from: '"DIGITAL DELIGHTS"<digital.delight@gmail.com>',
        to,
        subject,
        html,
        text,
      })
     
    
  } catch (error) {
    throw new error("Error sending welcome email", error.message);
  }
}
export const getEmailTemplate = async (type, data) => {

  switch (type) {
    case 'signup':
      return {
        subject: 'Welcome to Our Service',
        text: `Hello ${data?.user.name}, welcome to our service!`,
        html: registrationEmailTemplate(data?.user.name)
      };
    case 'login':
      return {
        subject: 'Login Alert',
        text: `Hello ${data.findUser.name + data.findUser.name}, you have successfully logged in.`,
        html: loginEmailTemplate(data.findUser.name + data.findUser.name)
      };
    case 'forgotPassword':
      const otp = await otpGeneratorAndUpdate(data.exist.email);
      return {
        subject: 'Forgot Password',
        text: `Hello ${data.exist.name }, you have successfully logged in.`,
        html: forgotPasswordContent(data.exist.name , otp)
      };
      case 'notification':
        const { recipient, message, type } = data; // Assume data includes recipient, message, and type
        const recipientUser = await User.findById(recipient); // Fetch the recipient's details
      
        if (!recipientUser) {
          throw new Error("Recipient not found");
        }
      
        return {
          subject: `New Notification: ${type}`,
          text: `Hello ${recipientUser.firstname}, you have a new notification: ${message}`,
          html: sendNotificationContent(recipientUser.name , message, type)
        };
      
    
    
    default:
      return {};
  }
}
