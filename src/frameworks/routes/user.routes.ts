import { Router } from "express";
import { userControllers } from "@/controllers/users/index";
import { makeRequest } from "../makeRequestHandler";
import isAuth from "../middlewares/isAuth";

export const userRouter = Router();

userRouter.use(isAuth);
userRouter.get("/", makeRequest(userControllers.getUsers));
userRouter.get("/:id", makeRequest(userControllers.getOneUser));
userRouter.post(
    "/send-friend-request/:id",
    makeRequest(userControllers.sendReq)
);
userRouter.patch(
    "/pending-requests/accept/:id",
    makeRequest(userControllers.acceptRequest)
);
userRouter.patch(
    "/pending-requests/reject/:id",
    makeRequest(userControllers.rejectRequest)
);
// userRouter.get("/:id/photos");
// userRouter.get("/:id/friends");
// userRouter.post("/send-friend-request/:id");
// userRouter.get("/me");
// userRouter.get("/me/photos");
// userRouter.get("/me/friends");
// userRouter.get("/me/pending-requests");
// userRouter.patch("/me/pending-requests/:id/reject");
// userRouter.patch("/me/pending-requests/:id/accept");
