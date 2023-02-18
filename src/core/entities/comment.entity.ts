import { IComment } from "./comment.interfaces";
import { IAuthor } from "./post.interfaces";

export class CommentFactory {
    constructor(private sanitize: (str: string) => string) {
        this.sanitize = sanitize;
    }

    create(commentData: IComment) {
        const { author, text } = commentData;
        if (!text) {
            throw new Error("Comment text is missing");
        }
        if (this.sanitize(text).length < 5) {
            throw new Error("Comment text should be 5 characters at least");
        }
        if (!author) {
            throw new Error("Comment author is missing");
        }

        const sanitizedText = this.sanitize(text);
        return new Comment(commentData.author, sanitizedText);
    }
}

class Comment {
    constructor(public author: IAuthor, public text: string) {
        this.author = author;
        this.text = text;
    }
}
