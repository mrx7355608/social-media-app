import { IAuthor, IPost } from "./post.interfaces";

export class PostFactory {
    // TODO: add validation methods

    create(postData: IPost) {
        return new Post(
            postData.body,
            postData.likes,
            postData.comments,
            postData.author
        );
    }
}

class Post {
    constructor(
        public body: string,
        public likes: string[],
        public comments: string[],
        public author: IAuthor
    ) {
        this.body = body;
        this.likes = likes;
        this.comments = comments;
        this.author = author;
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
