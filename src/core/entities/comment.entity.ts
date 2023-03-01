import { IComment } from "./comment.interfaces";

export class CommentFactory {
    constructor(private sanitize: (str: string) => string) {
        this.sanitize = sanitize;
    }

    create(commentData: IComment) {
        const { author, text } = commentData;
        if (!text || !text.trim()) {
            throw new Error("Comment text is missing");
        }
        if (!author) {
            throw new Error("Comment author is missing");
        }

        const sanitizedText = this.sanitize(text);
        return new Comment(commentData.author, sanitizedText);
    }
}

class Comment {
    constructor(public author: string, public text: string) {
        this.author = author;
        this.text = text;
    }
}
