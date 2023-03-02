import { createNewPostController } from "./new-post";
import { postServices } from "@/core/use-cases/posts";
import { patchPostController } from "./patch-post";
import { patchLikeController } from "./patch-like-post";
import { patchCommentController } from "./patch-comment-post";
import { getCommentsController } from "./get-comments";
import { getOnePostController } from "./get-one-post";
import { deletePostController } from "./delete-post";
import { getMyPostsController } from "./get-my-posts";
import { getTimelineController } from "./get-timeline";

const getOnePost = getOnePostController(postServices.listOnePost);
const createPost = createNewPostController(postServices.addPost);
const updatePost = patchPostController(postServices.editPost);
const deletePost = deletePostController(postServices.removePost);
const likePost = patchLikeController(postServices.likePost);
const commentPost = patchCommentController(postServices.commentOnPost);
const getMyPosts = getMyPostsController(postServices.listMyPosts);
const getTimeline = getTimelineController(postServices.listTimeline);
const getComments = getCommentsController(postServices.listComments);

export const postController = {
    getOnePost,
    createPost,
    updatePost,
    deletePost,
    likePost,
    commentPost,
    getMyPosts,
    getTimeline,
    getComments,
};
