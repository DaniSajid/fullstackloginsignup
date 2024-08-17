import { Router } from "express";
import { loginUser, registerUser, verifyEmail } from "../controller/user.controller.js";

const router = Router();

router.post("/register",registerUser);
router.get("/verify/:token",verifyEmail);
router.post("/login",loginUser);

export default router;