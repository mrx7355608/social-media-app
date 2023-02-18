import { IPostDBModel } from "@/core/entities/post.interfaces";
import { IHttpRequest } from "../interfaces/httpRequest.interface";

export function deletePostController(
    deletePost: (postId: string, userId: string) => Promise<IPostDBModel>
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

            await deletePost(postId, userId);
            return {
                statusCode: 204,
                body: {},
            };
        } catch (err: any) {
            return {
                statusCode: err.statusCode || 400,
                body: { error: err.message },
            };
        }
    };
}
