import { IPostDBModel } from "@/core/interfaces/post.interfaces";
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
            const populatedPost = await post.populate([
                {
                    path: "author",
                    select: "firstname lastname profilePicture",
                },
                {
                    path: "comments",
                    select: "text author",
                    populate: {
                        path: "author",
                        select: "firstname lastname profilePicture",
                    },
                },
            ]);
            return {
                statusCode: 200,
                body: populatedPost,
            };
        } catch (err: any) {
            return {
                statusCode: err.statusCode || 400,
                body: { error: err.message },
            };
        }
    };
}
