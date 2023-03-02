import { Document } from "mongoose";

export interface IComment {
    author: string;
    text: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface ICommentDBModel extends IComment, Document {}
