import { IPost } from "@/core/entities/post.interfaces";
import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
    {
        body: {
            type: String,
            required: true,
        },
        likes: {
            type: [String],
            required: true,
        },
        comments: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: "Comment",
            required: true,
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const PostModel = mongoose.model<IPost>("Post", postSchema);
export { PostModel };
