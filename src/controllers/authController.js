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

export const login = async (req, res)=>{
   const {email, password} = req.body;
   try{
      const validUser = await User.findOne({email});
      if(!validUser || validUser == null) {
         return next(errorHandler(404, 'User not found! Please enter the correct details or sign up.'));
      }

      const validPassword = bcryptjs.compareSync(password, validUser.password);
      if(!validPassword || validPassword == null) {
         return next(errorHandler(404, "Invalid Password! Please enter the correct password."));
      }

      const token = jwt.sign({id:validUser._id}, process.env.JWT_SECRET);
      const {password: pass, ...rest} = validUser._doc;
      res.cookie('access_token', token, {httpOnly:true, expires: new Date(Date.now() + 60*60*24*365)}).status(200).json(rest);
      
   } catch(error){
      next(error);
   }
}