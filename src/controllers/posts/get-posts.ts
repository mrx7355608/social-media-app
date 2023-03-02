import { IPostDBModel } from "@/core/interfaces/post.interfaces";
import { IPaginationData } from "@/core/interfaces/data-source-generic.interface";
import { IHttpRequest } from "../interfaces/httpRequest.interface";

export function getPostsController(
    listAllPosts: (paginationData: IPaginationData) => Promise<IPostDBModel[]>
) {
    return async function (httpRequest: IHttpRequest) {
        try {
            const paginationData = httpRequest.query;
            const posts = await listAllPosts(paginationData);
            return {
                statusCode: 200,
                body: posts,
            };
        } catch (err: any) {
            return {
                statusCode: err.statusCode || 400,
                body: { error: err.message },
            };
        }
    };
}
