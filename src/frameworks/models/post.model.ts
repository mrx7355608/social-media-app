import { IPost } from "@/core/entities/post.interfaces";
import mongoose from "mongoose";

const authorSchema = new mongoose.Schema({
    fullname: String,
    linkToProfile: String,
    profilePicture: String,
});

const commentSchema = new mongoose.Schema({
    author: authorSchema,
    text: {
        type: String,
        required: true,
    },
});

const postSchema = new mongoose.Schema({
    body: {
        type: String,
        required: true,
    },
    likes: {
        type: [String],
        required: true,
    },
    comments: {
        type: [commentSchema],
        required: true,
    },
    author: authorSchema,
});

const PostModel = mongoose.model<IPost>("Post", postSchema);
