import bcryptjs from "bcryptjs";
import User from "../model/userModel.js";
import jwt from 'jsonwebtoken';
import errorHandler from "../utils/error.js";

export const register = async (req, res)=>{
    const {profilePic, username, fullname, email, password} = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({username, fullname, email, password:hashedPassword});
    try{
       await newUser.save();
       res.status(201).json({message:'User created successfully'});
    } catch(error){
       console.log(error);
       next(error);
    }
 }