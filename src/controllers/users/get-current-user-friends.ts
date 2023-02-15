import { IHttpRequest } from "../interfaces/httpRequest.interface";

export function getCurrentUserFriendsController() {
    return async function (httpRequest: IHttpRequest) {
        const currentUser = httpRequest.user;
        const friends = await currentUser.populate("friends");
        return {
            statusCode: 200,
            body: friends,
        };
    };
}
