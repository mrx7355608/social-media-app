import { Router } from "express";
import { makeRequest } from "../makeRequestHandler";
import { authController } from "@/controllers/auth";
import isAuth from "../middlewares/isAuth";

export const authRouter = Router();

authRouter.post("/login", authController.login); // passportjs login
authRouter.post("/signup", makeRequest(authController.registerUser));
authRouter.post("/forgot-password", makeRequest(authController.forgotPassword));
authRouter.get("/verify-account", makeRequest(authController.verifyAccount));
authRouter.post(
    "/resend-verification-email",
    makeRequest(authController.resendAccountVerificationEmail)
);
authRouter.post("/logout", isAuth, authController.logout);
