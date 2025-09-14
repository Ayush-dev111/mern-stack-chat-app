import { generateToken } from '../lib/utils.js';
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import {sendWelcomeEmail} from '../nodemailer/email.js';
import { ENV } from '../lib/env.js';


export const userSignup = async(req, res)=>{
     const {fullName, email, password} = req.body;
    try {
       

        if(!fullName || !email || !password){
           return res.status(400).json({success: false, message: "All fields are required"});
        };

        if(password.length < 6){
            return res.status(400).json({success: false, message: "password must be atleast 6 characters long"});
        }

        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!regex.test(email)){
            return res.status(400).json({success: false, message: "invalid email format"});
        }

        const user = await User.findOne({email});

        if(user){
            return res.status(400).json({success: false, message: "user already exists "});
        };

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User ({
            fullName : fullName,
            email : email, 
            password: hashedPassword
        });

        await newUser.save();
        generateToken(newUser._id, res);
     
        res.status(201).json({
            success: true,
            message: "user signup successful",
            data: {...newUser._doc, password: "undefined"}});
        
        sendWelcomeEmail(newUser.email, newUser.fullName , ENV.CLIENT_URL);
        
    } catch (error) {
        console.log("Error in signup route", error);
        res.status(500).json({success: false, message: "error in signing up"});
    }
};

export const userLogin = ()=>{

};

export const userLogout = ()=>{

};
