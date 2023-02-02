import { IAuthor } from "./author.interfaces";

export interface IPostEntity extends IPost {
    markDeleted(): void;
    toggleLike(userid: string): void;
    addComment(commentid: string): void;
    removeComment(commentid: string): void;
}

export interface IPost {
    author: IAuthor;
    likes: string[];
    comments: string[];
    text: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface IPostHelperFunctions {
    sanitize: (str: string) => string;
    createAuthor: (authorData: IAuthor) => IAuthor;
}
