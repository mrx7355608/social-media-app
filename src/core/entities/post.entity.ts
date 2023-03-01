import { IPost } from "./post.interfaces";

export class PostFactory {
    constructor(private sanitize: (str: string) => string) {
        this.sanitize = sanitize;
    }

    create(postData: IPost): IPost {
        const { body, author, likes, comments, createdAt, updatedAt } =
            postData;

        // Validations
        if (!body) {
            throw new Error("Post body is missing");
        }
        if (this.sanitize(body).length < 10) {
            throw new Error("Post body should be 10 characters at least");
        }
        if (!author) {
            throw new Error("Post author is missing");
        }
        if (!likes) {
            throw new Error("Post likes are missing");
        }
        if (!likes.every((elem) => typeof elem === "string")) {
            throw new Error("Post likes contain one or more invalid values");
        }
        if (!comments) {
            throw new Error("Post comments are missing");
        }
        if (!comments.every((elem) => typeof elem === "string")) {
            throw new Error("Post comments contain one or more invalid values");
        }

        const sanitizedBody = this.sanitize(body);

        return new Post(
            sanitizedBody,
            likes,
            comments,
            author,
            createdAt,
            updatedAt
        );
    }
}

class Post {
    constructor(
        public body: string,
        public likes: string[],
        public comments: string[],
        public author: string,
        public createdAt: Date,
        public updatedAt: Date
    ) {
        this.body = body;
        this.likes = likes;
        this.comments = comments;
        this.author = author;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    addLike(userId: string) {
        this.likes.push(userId);
    }

    addComment(commentId: string) {
        this.comments.push(commentId);
    }

    removeComment(commentId: string) {
        // comments array contains mongodb objectId
        this.comments = this.comments.filter((id) => String(id) !== commentId);
    }

    removeLike(userId: string) {
        // likes array contains mongodb objectId
        this.likes = this.likes.filter((id) => String(id) !== userId);
    }
}
