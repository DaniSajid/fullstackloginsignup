import { User } from "../models/user.model.js";
import  bcrypt  from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

const registerUser = async (req, res) => {
    try {
      const { firstName, lastName, email, password } = req.body;
  
      if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
      const isUserAlreadyExist = await User.findOne({ email });
      if (isUserAlreadyExist) {
        return res.status(400).json({ message: "User already exists" });
      }
  
      const hashPass = await bcrypt.hash(password, 10);
  
      const saveUser = await User.create({
        firstName,
        lastName,
        email,
        password: hashPass,
        isVerified: false
      });
  
      const token = jwt.sign({ id: saveUser._id }, process.env.JWT_SECRET, {
        expiresIn: "2h"
      });
  
      saveUser.token = token;
  
      // Send verification email
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER, // Your email address
          pass: process.env.EMAIL_PASS  // Your email password
        }
      });
  
      const verificationLink = `http://localhost:5000/api/v1/user/verify/${token}`;
  
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: saveUser.email,
        subject: 'Please verify your email',
        html: `<p>Click <a href="${verificationLink}">here</a> to verify your email.</p>`
      };
  
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log('Error sending email:', error);
        } else {
          console.log('Email sent:', info.response);
        }
      });
  
      res.status(201).json({
        message: "User created successfully. Please check your email to verify your account.",
        user: saveUser
      });
  
    } catch (error) {
      console.log("Register user error", error);
    }
  }
  const verifyEmail = async (req, res) => {
    try {
        const { token } = req.params;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
        const user = await User.findById(decoded.id);
        if (!user) {
          return res.status(400).json({ message: "Invalid token" });
        }
    
        user.isVerified = true;
        await user.save();
    
        res.status(200).json({ message: "Email verified successfully" });
      } catch (error) {
        console.log("Email verification error:", error);
        res.status(400).json({ message: "Email verification failed" });
      }
  }
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email && !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        //   match password  email
        const userEmail = await User.findOne({ email });
        if (userEmail && (await bcrypt.compare(password, userEmail.password))) {
            const token = jwt.sign(
                { id: userEmail._id },
                process.env.JWT_SECRET,
                {
                    expiresIn: "2h"
                }
            )
            userEmail.token = token;
            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true
            }
            res.status(200).cookie("token", token, options).json({
                success: true,
                token,
                userEmail
            });

            res.status(200).json(userEmail);

        } else {
            res.status(400).json("User not found");
        }

    } catch (error) {
        console.log("Login user error", error);

    }
}
export { registerUser, loginUser,verifyEmail };