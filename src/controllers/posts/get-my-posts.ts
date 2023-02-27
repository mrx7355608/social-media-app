import { IPostDBModel } from "@/core/entities/post.interfaces";
import { IHttpRequest } from "../interfaces/httpRequest.interface";

export function getMyPostsController(
    listMyPosts: (userId: string) => Promise<IPostDBModel[]>
) {
    return async function (httpRequest: IHttpRequest) {
        try {
            const userId = String(httpRequest.user._id);
            const myPosts = await listMyPosts(userId);
            return {
                statusCode: 200,
                body: myPosts,
            };
        } catch (err: any) {
            return {
                statusCode: err.statusCode || 400,
                body: { error: err.message },
            };
        }
    };
}
