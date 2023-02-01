import {
    IPostData,
    IPostAuthor,
    IPostEntity,
} from "../interfaces/post.interfaces";

export class PostFactory {
    private sanitize: (str: string) => string;
    private createAuthor: (authorData: IPostAuthor) => IPostAuthor;

    constructor(
        sanitize: (str: string) => string,
        createAuthor: (authorData: IPostAuthor) => IPostAuthor
    ) {
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

    public addLike(userid: string): void {
        this.likes.push(userid);
    }

    public removeLike(userid: string): void {
        this.likes = this.likes.filter((id) => id !== userid);
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
