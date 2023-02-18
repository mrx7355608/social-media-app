import { Document } from "mongoose";

export interface IPost {
    author: IAuthor;
    body: string;
    likes: [] | string[];
    comments: [] | string[];
}

export interface IPostDBModel extends IPost, Document {
    createdAt: Date;
    updatedAt: Date;
}

export interface IAuthor {
    authorId: string;
    fullname: string;
    profilePicture: string;
    linkToProfile: string;
}
