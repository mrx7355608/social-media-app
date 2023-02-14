import { IUserDBModel } from "@/core/interfaces/user.interfaces";
import { IHttpRequest } from "../interfaces/httpRequest.interface";

export function rejectRequestController({
    rejectReq,
}: {
    rejectReq: (requestId: string, userid: string) => Promise<IUserDBModel>;
}) {
    return async function (httpRequest: IHttpRequest) {
        try {
            const requestid = httpRequest.params.id;
            const userid = String(httpRequest.user._id);
            await rejectReq(requestid, userid);
            return {
                statusCode: 200,
                body: { message: "Request rejected" },
            };
        } catch (err: any) {
            return {
                statusCode: err.statusCode || 400,
                body: { error: err.message },
            };
        }
    };
}
