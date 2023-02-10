import { Router } from "express";
import { makeRequest } from "../makeRequestHandler";
import { authController } from "@/controllers/auth";

export const authRouter = Router();

authRouter.post("/signup", makeRequest(authController.registerUser));
authRouter.get("/verify-account", makeRequest(authController.verifyAccount));
authRouter.post(
    "/resend-verification-email",
    makeRequest(authController.resendAccountVerificationEmail)
);
authRouter.post("/forgot-password", makeRequest(authController.forgotPassword));
