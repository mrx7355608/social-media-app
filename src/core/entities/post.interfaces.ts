import { Document } from "mongoose";

export interface IPost {
    author: string;
    body: string;
    likes: string[];
    comments: string[];
}

export interface IPostDBModel extends IPost, Document {
    createdAt: Date;
    updatedAt: Date;
}
