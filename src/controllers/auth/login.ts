import passport from "passport";
import { Request, Response, NextFunction } from "express";

export function loginController() {
    return function (req: Request, res: Response, next: NextFunction) {
        // return error if user is already logged in
        if (req.isAuthenticated()) {
            return res.status(400).json({ error: "You are already logged in" });
        }
        passport.authenticate("local", function (err, user, info) {
            if (err) {
                return res.status(500).json({ error: "Something went wrong" });
            }
            if (info) {
                return res.status(400).json({ error: info.message });
            }
            req.logIn(user, function (err) {
                if (err) {
                    return res
                        .status(500)
                        .json({ error: "Something went wrong" });
                }
                return res.status(200).json({ login: true });
            });
        })(req, res, next);
    };
}
