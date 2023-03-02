import { ICommentDBModel } from "@/core/interfaces/comment.interfaces";
import { IHttpRequest } from "../interfaces/httpRequest.interface";

export function getCommentsController(
    listComments: (id: string) => Promise<ICommentDBModel[]>
) {
    return async function (httpRequest: IHttpRequest) {
        try {
            const postId = httpRequest.params.id;
            const comments = await listComments(postId);
            return {
                statusCode: 200,
                body: comments,
            };
        } catch (err: any) {
            return {
                statusCode: err.statusCode || 400,
                body: { error: err.message },
            };
        }
    };
}
