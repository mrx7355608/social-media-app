export interface IPostAuthor {
    firstname: string;
    lastname: string;
    linkToProfile: string;
    photo: string;
}

export interface IPostEntity extends IPostData {
    markDeleted(): void;
    toggleLike(userid: string): void;
    addComment(commentid: string): void;
    removeComment(commentid: string): void;
}

export interface IPostData {
    author: IPostAuthor;
    likes: string[];
    comments: string[];
    text: string;
}
