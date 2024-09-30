import  User  from "../model/userSchemas.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js"
import jwt from "jsonwebtoken"
const SECRET_KEY = process.env.SECRET_KEY || "mnbvcxza479";
const authMiddleware =asyncHandler(async(req,res,next)=>{
    let token;
    if(req?.headers?.authorization?.startsWith('Bearer')){
        token=req.headers.authorization.split(" ")[1];
       
        try{
            if(token){
                console.log("token",SECRET_KEY);
                let decoded=jwt.verify(token,SECRET_KEY)
                let user=await User.findById(decoded?.id);
                
                req.user=user
                next()
            }
            
        }catch(error){
            throw new ApiError(501,"Invalid token Please Enter right token here!",error);
        }
    }else{
        throw new ApiError(501,"You are not attached any token");
    }
})

const isStudent=asyncHandler(async(req,res,next)=>{
    const email=req.user;
   
    const adminUser=await User.findOne(email);
    if(adminUser.role!=="student"){
        return next(new ApiError([],"","You are not a student",500))
    }else{
        next();
    }
})

const isTeacher=asyncHandler(async(req,res,next)=>{
    const email=req.user;
   
    const adminUser=await User.findOne(email);
    if(adminUser.role!=="teacher"){
        return next(new ApiError([],"","You are not a admin",500))
    }else{
        next();
    }
})

const isParent=asyncHandler(async(req,res,next)=>{
    const email=req.user;
   
    const adminUser=await User.findOne(email);
    if(adminUser.role!=="parent"){
        return next(new ApiError([],"","You are not a parent",500))
    }else{
        next();
    }
})

const isAdmin=asyncHandler(async(req,res,next)=>{
    const email=req.user;
   
    const adminUser=await User.findOne(email);
    if(adminUser.role!=="parent"){
        return next(new ApiError([],"","You are not a parent",500))
    }else{
        next();
    }
})
export {isStudent,authMiddleware,isTeacher,isParent,isAdmin};