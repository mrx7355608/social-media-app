import { IAuthor } from "./post.interfaces";
import { Document } from "mongoose";

export interface IComment {
    author: IAuthor;
    text: string;
}

export interface ICommentDBModel extends IComment, Document {
    createdAt: Date;
    updatedAt: Date;
}
