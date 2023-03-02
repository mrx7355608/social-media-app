import { IPostDBModel } from "@/core/interfaces/post.interfaces";
import { IHttpRequest } from "../interfaces/httpRequest.interface";

export function getTimelineController(
    listTimeline: (userId: string, page: number) => Promise<IPostDBModel[]>
) {
    return async function (httpRequest: IHttpRequest) {
        try {
            const userId = String(httpRequest.user._id);
            const page = httpRequest.query.page * 1 || 1;
            const timeline = await listTimeline(userId, page);
            return {
                statusCode: 200,
                body: timeline,
            };
        } catch (err: any) {
            return {
                statusCode: err.statusCode || 400,
                body: { error: err.message },
            };
        }
    };
}
