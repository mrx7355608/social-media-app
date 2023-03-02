import { IPostDBModel } from "@/core/interfaces/post.interfaces";
import { IHttpRequest } from "../interfaces/httpRequest.interface";

export function patchLikeController(
    likePost: (postId: string, userId: string) => Promise<IPostDBModel>
) {
    return async function (httpRequest: IHttpRequest) {
        try {
            // Get ids
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

            // Like / Unlike post
            const post = await likePost(postId, userId);

            // Send response
            const response = {
                likes: post.likes,
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
