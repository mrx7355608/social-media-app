import { commentFactory } from "@/core/entities";
import { IComment } from "@/core/interfaces/comment.interfaces";
import { ICommentDataSource } from "@/core/interfaces/commentDataSource.interface";
import { IErrorServices } from "@/services/interfaces/errorServices.interface";

export function editCommentFactory(
    commentDataSource: ICommentDataSource,
    errorServices: IErrorServices,
    isMongoId: (id: string) => boolean
) {
    return async function (
        commentId: string,
        userId: string,
        data: { text: string }
    ): Promise<IComment> {
        // Validate id
        if (!isMongoId(commentId)) {
            return errorServices.validationError("Comment Id is invalid");
        }

        // Check if comment exists
        const comment = await commentDataSource.findById(commentId);
        if (!comment) {
            return errorServices.notFoundError("Comment not found");
        }

        // Check if it is the owner who is editing comment
        if (userId !== comment.author) {
            return errorServices.forbiddenError("You cannot edit this comment");
        }

        // Create an object containing new data
        // It will override the old data with new one
        const newData = Object.assign(comment, data);

        // Create a comment entity
        const validComment = commentFactory.create(newData);

        // Update comment
        return await commentDataSource.update(commentId, {
            text: validComment.text,
            author: validComment.author,
            createdAt: validComment.createdAt,
            updatedAt: new Date(Date.now()),
        });
    };
}
