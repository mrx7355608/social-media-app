import { IComment, ICommentDBModel } from "./comment.interfaces";

export interface ICommentDataSource {
    findById(commentId: string): Promise<ICommentDBModel | null>;
    insert(data: IComment): Promise<ICommentDBModel>;
    update(commentId: string, changes: IComment): Promise<ICommentDBModel>;
    deleteComment(commentId: string): Promise<ICommentDBModel>;
}
