import express from 'express';
const app = express();
import dotenv from 'dotenv';
dotenv.config();
const PORT = process.env.PORT;
import connection from './configure/mongodb.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import Userroute from './routes/User.route.js';
import GradeRoute from './routes/Grade.route.js';
import ClassRoute from './routes/Class.route.js';
import AttendanceRoute from './routes/Attendance.route.js';
import FeedBackRoutes from './routes/Feedback.route.js';
import NotificationRoutes from './routes/Notification.route.js';
import CourseRoutes from './routes/Course.route.js';
import { errorHandler } from './middleware/errorHandling.middleware.js';
app.use(cors({
    origin:process.env.CROSS_ORIGIN || "http://localhost:5173",
    credentials:true
}))
app.use(cookieParser());
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static('public'))
app.use(express.json({limit:"16kb"}))
app.use('/api/user',Userroute);
app.use('/api/class',ClassRoute);
app.use('/api/course',CourseRoutes);
app.use('/api/attendance',AttendanceRoute);
app.use('/api/notifications',NotificationRoutes);
app.use('/api/feedback',FeedBackRoutes);
app.use('/api/grade',GradeRoute);
app.use(errorHandler);
connection()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server Running Sucessfully ${PORT}`)
        })
    })
    .catch((error) => {
        throw new error("Server not Running", error);
    })