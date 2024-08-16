import { User } from "../models/user.model.js";
import  bcrypt  from "bcryptjs";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

const registerUser = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body

        if (!firstName && !lastName && !email && !password) {
            return res.status(400).json({ message: "All fields are required" })

        }

        const isUserAlreadyExist = await User.findOne({ email });
        if (isUserAlreadyExist) {
            return res.status(400).json({ message: "User already exist" })
        }

        const hashPass = await bcrypt.hash(password, 10);

        const saveUser = await User.create({
            firstName,
            lastName,
            email,
            password: hashPass
        });

        const token = jwt.sign(
            { id: saveUser._id },
            process.env.JWT_SECRET,
            {
                expiresIn: "2h"
            }

        );
        saveUser.token = token;
        res.status(201).json(saveUser);
        console.log(saveUser);
        
    } catch (error) {
        console.log("Register user error", error);
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
export { registerUser, loginUser };