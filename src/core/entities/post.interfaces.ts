import { Document } from "mongoose";

export interface IPost {
    author: string;
    body: string;
    likes: string[];
    comments: string[];
    createdAt: Date;
    updatedAt: Date;
}

export interface IPostDBModel extends IPost, Document {}
