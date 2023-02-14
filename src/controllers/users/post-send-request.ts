import { IUserDBModel } from "@/core/interfaces/user.interfaces";
import { IHttpRequest } from "../interfaces/httpRequest.interface";

export function sendRequestController({
    sendRequest,
}: {
    sendRequest: (friendid: string, userid: string) => Promise<IUserDBModel>;
}) {
    return async function (httpRequest: IHttpRequest) {
        try {
            // convert mongodb objectId into string
            const userid: string = String(httpRequest.user._id);
            const friendid: string = httpRequest.params.id;
            await sendRequest(friendid, userid);
            return {
                statusCode: 200,
                body: { message: "Friend request has been sent!" },
            };
        } catch (err: any) {
            return {
                statusCode: err.statusCode || 400,
                body: { error: err.message },
            };
        }
    };
}
