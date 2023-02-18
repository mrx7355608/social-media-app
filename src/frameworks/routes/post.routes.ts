import { Router } from "express";
import { makeRequest } from "../makeRequestHandler";
import { postController } from "@/controllers/posts";
import isAuth from "../middlewares/isAuth";

export const postRouter = Router();

postRouter.use(isAuth);
postRouter.get("/", makeRequest(postController.getAllPosts));
postRouter.get("/:id", makeRequest(postController.getOnePost));
postRouter.post("/", makeRequest(postController.createPost));
postRouter.patch("/:id", makeRequest(postController.updatePost));
postRouter.delete("/:id", makeRequest(postController.deletePost));
postRouter.patch("/like/:id", makeRequest(postController.likePost));
postRouter.patch("/comment/:id", makeRequest(postController.commentPost));
