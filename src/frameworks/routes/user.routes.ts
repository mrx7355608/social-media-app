import { Router } from "express";
import { userControllers } from "@/controllers/users/index";
import { makeRequest } from "../makeRequestHandler";

export const userRouter = Router();

userRouter.get("/", makeRequest(userControllers.getUsers));
userRouter.get("/:id", makeRequest(userControllers.getOneUser));
// userRouter.get("/:id/photos");
// userRouter.get("/:id/friends");
// userRouter.post("/send-friend-request/:id");
// userRouter.get("/me");
// userRouter.get("/me/photos");
// userRouter.get("/me/friends");
// userRouter.get("/me/pending-requests");
// userRouter.patch("/me/pending-requests/:id/reject");
// userRouter.patch("/me/pending-requests/:id/accept");
