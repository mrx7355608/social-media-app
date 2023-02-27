import { listAllPostsFactory } from "./listAllPosts";
import { listOnePostFactory } from "./listOnePost";
import { addPostFactory } from "./addPost";
import { editPostFactory } from "./editPost";
import { removePostFactory } from "./removePost";
import { likePostFactory } from "./likePost";
import { commentOnPostFactory } from "./commentOnPost";
import { removeCommentFromPostFactory } from "./removeCommentFromPost";
import { listMyPostsFactory } from "./listMyPosts";
import { listTimelineFactory } from "./listTimeline";

import { ErrorServices } from "@/services/error.services";
import validator from "validator";
import { PostDataSource } from "@/data/post.data";
import { UserDataSource } from "@/data/user.data";

const postDataSource = new PostDataSource();
const userDataSource = new UserDataSource();
const errorServices = new ErrorServices();
const isMongoId = validator.isMongoId;

const listAllPosts = listAllPostsFactory(postDataSource);
const listOnePost = listOnePostFactory(
    postDataSource,
    errorServices,
    isMongoId
);
const addPost = addPostFactory(postDataSource);
const editPost = editPostFactory(postDataSource, errorServices, isMongoId);
const removePost = removePostFactory(postDataSource, errorServices, isMongoId);
const likePost = likePostFactory(postDataSource, errorServices, isMongoId);
const listTimeline = listTimelineFactory(userDataSource, postDataSource);
const listMyPosts = listMyPostsFactory(
    userDataSource,
    postDataSource,
    errorServices,
    isMongoId
);
const commentOnPost = commentOnPostFactory(
    postDataSource,
    errorServices,
    isMongoId
);
const removeComment = removeCommentFromPostFactory(
    postDataSource,
    errorServices,
    isMongoId
);

export const postServices = {
    listAllPosts,
    listOnePost,
    addPost,
    editPost,
    removePost,
    likePost,
    commentOnPost,
    removeComment,
    listMyPosts,
    listTimeline,
};
