import { Document } from "mongoose";

export interface IComment {
    author: string;
    text: string;
}

export interface ICommentDBModel extends IComment, Document {
    createdAt: Date;
    updatedAt: Date;
}
