import { commentFactory } from "@/core/entities";
import { IComment } from "@/core/interfaces/comment.interfaces";
import { ICommentDataSource } from "@/core/interfaces/commentDataSource.interface";
import { IErrorServices } from "@/services/interfaces/errorServices.interface";

export function removeCommentFactory(
    commentDataSource: ICommentDataSource,
    errorServices: IErrorServices,
    isMongoId: (id: string) => boolean
) {
    return async function (commentId: string): Promise<IComment> {
        // Validate id
        if (!isMongoId(commentId)) {
            return errorServices.validationError("Comment Id is invalid");
        }

        // Check if comment exists
        const comment = await commentDataSource.findById(commentId);
        if (!comment) {
            return errorServices.notFoundError("Comment not found");
        }

        // Delete comment
        return await commentDataSource.deleteComment(commentId);
    };
}
