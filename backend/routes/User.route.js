import {
    getAllUser,
    getAUser,
    handleRefreshToken,
    loginUser,
    registeredUser,
    resetPassword,
    forgotPassword,
    logOut,
    getParentStudents,
    updatePassword,
    adminLogin
} from "../controllers/UserController.js";
import express from 'express';
import {
    loginValidation,
    registerValidation,
    resetPassword1,
    forgotPassword1,
    updatepassword
} from "../middleware/validator.middleware.js";
import { authMiddleware,isParent,isTeacher } from '../middleware/auth.middleware.js'
import User from "../model/userSchemas.js";
const Userroute = express.Router();
Userroute.post('/signup', registerValidation, registeredUser);
Userroute.post('/login', loginValidation, loginUser);
Userroute.post('/adminlogin', loginValidation, adminLogin);
Userroute.get('/refreshToken', handleRefreshToken);
Userroute.get('/get',isTeacher,getAllUser);
Userroute.get('/get/:id', authMiddleware, getAUser);
Userroute.post('/resetPassword', resetPassword1, resetPassword);
Userroute.post('/forgotPassword', forgotPassword1, forgotPassword);
Userroute.put('/updatePassword',authMiddleware,updatepassword,updatePassword);
Userroute.get('/parent/students', authMiddleware, isParent, getParentStudents);
Userroute.get('/logout', logOut);
export default Userroute