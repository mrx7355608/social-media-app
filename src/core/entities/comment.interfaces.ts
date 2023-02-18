import { IAuthor } from "./post.interfaces";

export interface IComment {
    author: IAuthor;
    text: string;
}
