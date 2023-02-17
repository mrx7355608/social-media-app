import { Router } from "express";
import { userControllers } from "@/controllers/users/index";
import { makeRequest } from "../makeRequestHandler";
import isAuth from "../middlewares/isAuth";
import multer from "multer";
const upload = multer({ storage: multer.memoryStorage() });

export const userRouter = Router();

userRouter.use(isAuth);
userRouter.get("/", makeRequest(userControllers.getUsers));
userRouter.get("/me", makeRequest(userControllers.getCurrentUser));
userRouter.get("/search", makeRequest(userControllers.search));
userRouter.get("/:id", makeRequest(userControllers.getOneUser));
userRouter.post(
    "/send-friend-request/:id",
    makeRequest(userControllers.sendReq)
);
userRouter.patch(
    "/me/pending-requests/accept/:id",
    makeRequest(userControllers.acceptRequest)
);
userRouter.patch(
    "/me/pending-requests/reject/:id",
    makeRequest(userControllers.rejectRequest)
);
userRouter.patch(
    "/me/change-password",
    makeRequest(userControllers.changePassword)
);
userRouter.patch(
    "/me/change-picture",
    upload.single("profilePicture"),
    makeRequest(userControllers.changePicture)
);
userRouter.get(
    "/me/friends",
    makeRequest(userControllers.getCurrentUserFriends)
);
userRouter.patch(
    "/me/remove-friend/:id",
    makeRequest(userControllers.removeUserFriend)
);
// userRouter.get("/:id/photos");
// userRouter.get("/:id/friends");
// userRouter.post("/send-friend-request/:id");
// userRouter.get("/me/pending-requests");
