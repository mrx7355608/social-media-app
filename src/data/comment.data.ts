import { IComment } from "@/core/entities/comment.interfaces";
import { CommentModel } from "@/frameworks/models/comment.model";

export class CommentDataSource {
    async insert(data: IComment): Promise<IComment> {
        const newComment = await CommentModel.create(data);
        return newComment;
    }

    async update(commentId: string, changes: IComment): Promise<IComment> {
        const updatedComment = await CommentModel.findByIdAndUpdate(
            commentId,
            changes
        );
        return updatedComment as IComment;
    }
    async deleteComment(commentId: string): Promise<IComment> {
        const deletedComment = await CommentModel.findByIdAndDelete(commentId);
        return deletedComment as IComment;
    }
}
