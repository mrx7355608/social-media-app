import { Document } from "mongoose";

export interface IPost {
    author: IAuthor;
    body: string;
    likes: [] | string[];
    comments: [] | string[];
}

export interface IPostModel extends IPost, Document {
    createdAt: Date;
    updatedAt: Date;
}

export interface IAuthor {
    fullname: string;
    profilePicture: string;
    linkToProfile: string;
}
