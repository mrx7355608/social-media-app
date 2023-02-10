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

authRouter.post("/signup", makeRequest(authController.registerUser));
authRouter.post(
    "/login",
    function (req: Request, res: Response, next: NextFunction) {
        passport.authenticate("local", function (err, user, info) {
            if (err) return res.status(500).json({ error: err.message });
            if (info) return res.status(400).json({ error: info.message });
            req.logIn(user, function (err) {
                if (err) return res.status(500).json({ error: err.message });
                return res.status(200).json({ login: true });
            });
        })(req, res, next);
    }
);

authRouter.get("/verify-account", makeRequest(authController.verifyAccount));
authRouter.post(
    "/resend-verification-email",
    makeRequest(authController.resendAccountVerificationEmail)
);
authRouter.post("/forgot-password", makeRequest(authController.forgotPassword));
