import passport from "passport";
import { Request, Response, NextFunction } from "express";
import { IUser } from "@/core/interfaces/user.interfaces";

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

                const fullname = createFullname(user.firstname, user.lastname);
                const userData = {
                    fullname,
                    pendingRequests: user.pendingRequests,
                    profilePicture: user.profilePicture,
                    id: user._id,
                };
                return res.status(200).json(userData);
            });
        })(req, res, next);
    };

    function createFullname(firstname: string, lastname: string): string {
        // Capitalize first letter of the name
        const fnameFirstCaps = firstname.substring(0, 1).toUpperCase();
        const lnameFirstCaps = lastname.substring(0, 1).toUpperCase();
        return `${fnameFirstCaps + firstname.substring(1)} ${
            lnameFirstCaps + lastname.substring(1)
        }`;
    }
}
