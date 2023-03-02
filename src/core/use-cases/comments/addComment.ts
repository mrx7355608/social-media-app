import { commentFactory } from "@/core/entities";
import {
    IComment,
    ICommentDBModel,
} from "@/core/interfaces/comment.interfaces";
import { ICommentDataSource } from "@/core/interfaces/commentDataSource.interface";

export function addCommentFactory(commentDataSource: ICommentDataSource) {
    return async function (data: IComment): Promise<ICommentDBModel> {
        const validComment = commentFactory.create(data);
        return await commentDataSource.insert({
            text: validComment.text,
            author: validComment.author,
            createdAt: validComment.createdAt,
            updatedAt: validComment.updatedAt,
        });
    };
}
