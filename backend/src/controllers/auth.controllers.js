import { generateToken } from '../lib/utils.js';
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { sendWelcomeEmail } from '../nodemailer/email.js';
import { ENV } from '../lib/env.js';
import cloudinary from '../lib/cloudinary.js';


export const userSignup = async (req, res) => {
    const { fullName, email, password } = req.body;
    try {


        if (!fullName || !email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        };

        if (password.length < 6) {
            return res.status(400).json({ success: false, message: "password must be at least 6 characters long" });
        }

        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regex.test(email)) {
            return res.status(400).json({ success: false, message: "invalid email format" });
        }
        
        const user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ success: false, message: "user already exists " });
        };

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName: fullName,
            email: email,
            password: hashedPassword
        });

        await newUser.save();
        generateToken(newUser._id, res);

        res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            email: newUser.email,
            profilePic: newUser.profilePic,
        })


        sendWelcomeEmail(newUser.email, newUser.fullName, ENV.CLIENT_URL);

    } catch (error) {
        console.log("Error in signup route", error);
        res.status(500).json({ success: false, message: "error in signing up" });
    }
};

export const userLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "all fields are required" });
        };

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        const isPassCorrect = await bcrypt.compare(password, user.password);
        if (!isPassCorrect) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        generateToken(user._id, res);

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic,
        });
    } catch (error) {
        console.log("Error in login route :", error);
        res.status(500).json({ success: false, message: "internal server error" });
    };
};

export const userLogout = (_, res) => {
    res.cookie("jwt", " ", { maxAge: 0 });
    res.status(200).json({
        success: true,
        message: "Successfully logged out"
    })
};

export const updateProfile = async (req, res) => {
    try {
        const { profilePic } = req.body;

        if (!profilePic) {
            return res.status(400).json({ success: false, message: "Profile pic is required" });
        }

        const userId = req.user._id;
        const uploadResource = await cloudinary.uploader.upload(profilePic);

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { profilePic: uploadResource.secure_url },
            { new: true }
        )

        res.status(200).json(updatedUser);
    } catch (error) {
        console.log("Error in update Profile controller :", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    };
};

export const checkAuth = (req, res) => {
    try{
        res.status(200).json(req.user);
    }catch(error){
        console.log("Error in check auth controller:", error);
        res.status(500).json({message: "Internal server error"});
    }
};
