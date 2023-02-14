import { IUserDBModel } from "@/core/interfaces/user.interfaces";
import { IHttpRequest } from "../interfaces/httpRequest.interface";

export function acceptRequestController({
    acceptReq,
}: {
    acceptReq: (requestId: string, userid: string) => Promise<IUserDBModel>;
}) {
    return async function (httpRequest: IHttpRequest) {
        try {
            const requestid = httpRequest.params.id;
            const userid = String(httpRequest.user._id);
            await acceptReq(requestid, userid);
            return {
                statusCode: 200,
                body: { message: "Request accepted" },
            };
        } catch (err: any) {
            return {
                statusCode: err.statusCode || 400,
                body: { error: err.message },
            };
        }
    };
}
