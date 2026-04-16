import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { register, login,logout, fetchUser, generateOtp, verifyEmail, isAuthenticated, sendResetOtp,resetPassword  } from "../controller/authController.js"
import validate from "../middlewares/joiMiddlewareValidation.js";
import { userValidationSchema } from "../joiValidation/userSchemaValidation.js";
import asyncWrap from "../utils/asyncWrap.js";
const authRouter=express.Router();
authRouter.post("/register",validate(userValidationSchema),asyncWrap(register));
authRouter.post("/login",asyncWrap(login));
authRouter.post("/logout",asyncWrap(logout));
authRouter.post("/generate-otp",authMiddleware,asyncWrap(generateOtp));
authRouter.post("/verify-account",authMiddleware,asyncWrap(verifyEmail));
authRouter.post("/is-auth",authMiddleware,asyncWrap(isAuthenticated));
authRouter.post("/send-reset-otp",asyncWrap(sendResetOtp));
authRouter.post("/reset-password",asyncWrap(resetPassword));
authRouter.get("/fetchUser/:id",asyncWrap(fetchUser));
export default authRouter;
