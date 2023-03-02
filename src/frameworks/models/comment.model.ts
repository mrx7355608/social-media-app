import { IComment } from "@/core/interfaces/comment.interfaces";
import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
    {
        author: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        text: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const CommentModel = mongoose.model<IComment>("Comment", commentSchema);
export { CommentModel };
