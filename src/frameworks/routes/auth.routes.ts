import {
    NextFunction,
    RequestHandler,
    Router,
    Request,
    Response,
} from "express";
import { makeRequest } from "../makeRequestHandler";
import { authController } from "@/controllers/auth";
import passport from "passport";

export const authRouter = Router();

authRouter.post("/login", authController.login); // passportjs login
authRouter.post("/signup", makeRequest(authController.registerUser));
authRouter.get("/verify-account", makeRequest(authController.verifyAccount));
authRouter.post("/forgot-password", makeRequest(authController.forgotPassword));
authRouter.post("/logout", authController.logout);
authRouter.post(
    "/resend-verification-email",
    makeRequest(authController.resendAccountVerificationEmail)
);
