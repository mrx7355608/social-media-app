import { IComment } from "../../interfaces/comment.interfaces";
import { IAuthor } from "../../interfaces/author.interfaces";

export class CommentFactory {
    private sanitize: (str: string) => string;
    private createCommentAuthor: (authorData: IAuthor) => IAuthor;
    
    constructor (
    sanitize: (str: string) => string,
    createCommentAuthor: (authorData: IAuthor) => IAuthor
    ) {
        this.sanitize = sanitize;
        this.createCommentAuthor = createCommentAuthor;
    }

    create({ text, author }: IComment): IComment {
        if (!text) {
            throw new Error("Empty comment cannot be created")
        }
        if (typeof text !== "string") {
            throw new Error("Invalid comment text")
        }
        if (!author) {
            throw new Error("Comment author is missing")
        }

        const validText = this.sanitize(text)
        const validAuthor = this.createCommentAuthor(author)

        return new Comment(validText, validAuthor)
    }
}

class Comment {
    text: string;
    author: IAuthor;

    constructor(text: string, author: IAuthor) {
        this.text = text;
        this.author = author;
    }
}
