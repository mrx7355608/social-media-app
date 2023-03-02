import { IPostDBModel } from "@/core/interfaces/post.interfaces";
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
            const populated = await post.populate([
                {
                    path: "author",
                    select: "firstname lastname profilePicture",
                },
                {
                    path: "comments",
                },
            ]);

            const response = {
                _id: post._id,
                author: populated.author,
                body: post.body,
                createdAt: new Date(post.createdAt).toDateString(),
                updatedAt: new Date(post.updatedAt).toDateString(),
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
