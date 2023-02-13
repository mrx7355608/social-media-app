import { Router } from "express";
import { makeRequest } from "../makeRequestHandler";
import { authController } from "@/controllers/auth";
import isAuth from "../middlewares/isAuth";

export const authRouter = Router();

authRouter.post("/login", authController.login); // passportjs login
authRouter.post("/logout", isAuth, authController.logout); // passportjs logout
authRouter.post("/signup", makeRequest(authController.registerUser));
authRouter.get("/verify-account", makeRequest(authController.verifyAccount));
authRouter.post("/forgot-password", makeRequest(authController.forgotPassword));
authRouter.patch("/reset-password", makeRequest(authController.resetPassword));
authRouter.post(
    "/resend-verification-email",
    makeRequest(authController.resendAccountVerificationEmail)
);
