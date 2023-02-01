// TODO: add author entity
import {
    IPostData,
    IPostAuthor,
    IPostEntity,
    IPostHelperFunctions,
} from "../interfaces/post.interfaces";

export class PostFactory {
    private sanitize: (str: string) => string;
    private createAuthor: (authorData: IPostAuthor) => IPostAuthor;

    constructor({ sanitize, createAuthor }: IPostHelperFunctions) {
        this.sanitize = sanitize;
        this.createAuthor = createAuthor;
    }

    create({ text, author, comments, likes }: IPostData): IPostEntity {
        if (!text) {
            throw new Error("Empty post cannot be created");
        }
        if (typeof text !== "string") {
            throw new Error("Invalid post content");
        }
        if (this.sanitize(text).length < 10) {
            throw new Error("Post should be 10 characters long at least");
        }
        if (!likes) {
            throw new Error("Likes are missing");
        }
        if (!comments) {
            throw new Error("Comments are missing");
        }
        if (!author) {
            throw new Error("Author data is missing");
        }

        const validText = this.sanitize(text);
        const validAuthor = this.createAuthor(author);

        return new Post({
            text: validText,
            likes,
            comments,
            author: validAuthor,
        });
    }
}

class Post implements IPostEntity {
    text: string;
    likes: string[];
    comments: string[];
    author: IPostAuthor;

    constructor({ text, likes, comments, author }: IPostData) {
        this.text = text;
        this.likes = likes;
        this.comments = comments;
        this.author = author;
    }

    public toggleLike(userid: string): void {
        if (this.likes.includes(userid)) {
            this.likes = this.likes.filter((id) => id !== userid);
            return;
        }
        this.likes.push(userid);
    }

    public addComment(commentid: string): void {
        this.comments.push(commentid);
    }

    public removeComment(commentid: string): void {
        this.comments = this.comments.filter((id) => id !== commentid);
    }

    public markDeleted(): void {
        this.text = "[This post has been deleted]";
    }
}
