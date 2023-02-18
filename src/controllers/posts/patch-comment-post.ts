import { IPostDBModel } from "@/core/entities/post.interfaces";
import { IHttpRequest } from "../interfaces/httpRequest.interface";

export function patchCommentController(
    commentPost: (postId: string, userId: string) => Promise<IPostDBModel>
) {
    return async function (httpRequest: IHttpRequest) {
        try {
            const postId = httpRequest.params.id;
            if (!postId) {
                return {
                    statusCode: 400,
                    body: { error: "Post Id is missing" },
                };
            }

            const userId = String(httpRequest.user._id);
            if (!userId) {
                return {
                    statusCode: 400,
                    body: { error: "User seems to be un-authenticated" },
                };
            }

            await commentPost(postId, userId);
            return {
                statusCode: 200,
                body: { message: "Comment added on post!" },
            };
        } catch (err: any) {
            return {
                statusCode: err.statusCode || 400,
                body: { error: err.message },
            };
        }
    };
}
