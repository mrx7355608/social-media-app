import {
    IComment,
    ICommentDBModel,
} from "@/core/interfaces/comment.interfaces";
import { ICommentDataSource } from "@/core/interfaces/commentDataSource.interface";
import { CommentModel } from "@/frameworks/models/comment.model";

export class CommentDataSource implements ICommentDataSource {
    async findById(commentId: string): Promise<ICommentDBModel | null> {
        const comment = await CommentModel.findById(commentId);
        if (!comment) return null;
        return comment;
    }

    async insert(data: IComment): Promise<ICommentDBModel> {
        const newComment = await CommentModel.create(data);
        return newComment;
    }

    async update(
        commentId: string,
        changes: IComment
    ): Promise<ICommentDBModel> {
        const updatedComment = await CommentModel.findByIdAndUpdate(
            commentId,
            changes
        );
        return updatedComment as ICommentDBModel;
    }

    async deleteComment(commentId: string): Promise<ICommentDBModel> {
        const deletedComment = await CommentModel.findByIdAndDelete(commentId);
        return deletedComment as ICommentDBModel;
    }
}
