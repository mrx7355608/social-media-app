import { createNewPostController } from "./new-post";
import { postServices } from "@/core/use-cases/posts";
import { patchPostController } from "./patch-post";
import { patchLikeController } from "./patch-like-post";
import { patchCommentController } from "./patch-comment-post";
import { getPostsController } from "./get-posts";
import { getOnePostController } from "./get-one-post";
import { deletePostController } from "./delete-post";

const getAllPosts = getPostsController(postServices.listAllPosts);
const getOnePost = getOnePostController(postServices.listOnePost);
const createPost = createNewPostController(postServices.addPost);
const updatePost = patchPostController(postServices.editPost);
const deletePost = deletePostController(postServices.removePost);
const likePost = patchLikeController(postServices.likePost);
const commentPost = patchCommentController(postServices.commentOnPost);

export const postController = {
    getAllPosts,
    getOnePost,
    createPost,
    updatePost,
    deletePost,
    likePost,
    commentPost,
};
