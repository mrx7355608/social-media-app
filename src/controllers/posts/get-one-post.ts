import { IPostDBModel } from "@/core/entities/post.interfaces";
import { IHttpRequest } from "../interfaces/httpRequest.interface";

export function getOnePostController(
    listOnePost: (postId: string) => Promise<IPostDBModel>
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

            const post = await listOnePost(postId);
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
