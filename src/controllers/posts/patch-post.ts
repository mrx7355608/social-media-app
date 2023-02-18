import { IPostDBModel } from "@/core/entities/post.interfaces";
import { IHttpRequest } from "../interfaces/httpRequest.interface";

export function patchPostController(
    editPost: (
        postId: string,
        userId: string,
        changed: Object
    ) => Promise<IPostDBModel>
) {
    return async function (httpRequest: IHttpRequest) {
        try {
            const postId = httpRequest.params.id;
            const userId = String(httpRequest.user._id);
            const changes = httpRequest.body;

            if (!postId) {
                return {
                    statusCode: 400,
                    body: { error: "Post Id is missing" },
                };
            }
            if (!changes || Object.keys(changes).length < 1) {
                return {
                    statusCode: 400,
                    body: { error: "No changes were given" },
                };
            }

            const post = await editPost(postId, userId, changes);
            return {
                statusCode: 200,
                body: post,
            };
        } catch (err: any) {
            return {
                statusCode: err.statusCode || 400,
                body: { error: err.message },
            };
        }
    };
}
