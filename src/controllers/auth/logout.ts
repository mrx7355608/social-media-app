import { Request, Response, NextFunction } from "express";

export function logoutController() {
    return function (req: Request, res: Response, next: NextFunction) {
        req.logout(function (err) {
            if (err) return res.status(500).json({ error: err.message });
            return res.status(200).json({ logout: true });
        });
    };
}
