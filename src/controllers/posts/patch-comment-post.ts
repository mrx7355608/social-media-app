import {
    IComment,
    ICommentDBModel,
} from "@/core/interfaces/comment.interfaces";
import { IPostDBModel } from "@/core/interfaces/post.interfaces";
import { IHttpRequest } from "../interfaces/httpRequest.interface";

export function patchCommentController(
    commentPost: (
        postId: string,
        commentData: IComment
    ) => Promise<ICommentDBModel>
) {
    return async function (httpRequest: IHttpRequest) {
        try {
            const postId = httpRequest.params.id;
            const userId = String(httpRequest.user._id);
            if (!postId) {
                return {
                    statusCode: 400,
                    body: { error: "Post Id is missing" },
                };
            }

            if (!userId) {
                return {
                    statusCode: 400,
                    body: { error: "User seems to be un-authenticated" },
                };
            }

            const commentData: IComment = {
                text: httpRequest.body.comment,
                author: userId,
                createdAt: new Date(),
                updatedAt: new Date(),
            };

            const comment = await commentPost(postId, commentData);
            const populatedComment = await comment.populate(
                "author",
                "firstname lastname profilePicture"
            );

            const response = {
                _id: comment._id,
                text: comment.text,
                author: populatedComment.author,
                createdAt: new Date(comment.createdAt).toDateString(),
                updatedAt: new Date(comment.updatedAt).toDateString(),
            };

            return {
                statusCode: 200,
                body: response,
            };
        } catch (err: any) {
            return {
                statusCode: err.statusCode || 400,
                body: { error: err.message },
            };
        }
    };
}
