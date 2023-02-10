import { Request, Response, NextFunction } from "express";
export default function (req: Request, res: Response, next: NextFunction) {
    if (req.isAuthenticated()) return next();
    return res.status(401).json({ error: "You must be login first" });
}
