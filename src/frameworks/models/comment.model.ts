import { IComment } from "@/core/entities/comment.interfaces";
import mongoose from "mongoose";
import { authorSchema } from "./author.model";

const commentSchema = new mongoose.Schema(
    {
        author: authorSchema,
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
