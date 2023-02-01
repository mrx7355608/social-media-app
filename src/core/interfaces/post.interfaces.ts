import { IAuthor } from "./author.interfaces";

export interface IPostEntity extends IPostData {
    markDeleted(): void;
    toggleLike(userid: string): void;
    addComment(commentid: string): void;
    removeComment(commentid: string): void;
}

export interface IPostData {
    author: IAuthor;
    likes: string[];
    comments: string[];
    text: string;
}

export interface IPostHelperFunctions {
    sanitize: (str: string) => string;
    createAuthor: (authorData: IAuthor) => IAuthor;
}
