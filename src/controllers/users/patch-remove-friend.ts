import { IUserDBModel } from "@/core/interfaces/user.interfaces";
import { IHttpRequest } from "../interfaces/httpRequest.interface";

export function removeFriendController({
    removeFriend,
}: {
    removeFriend: (userid: string, friendid: string) => Promise<IUserDBModel>;
}) {
    return async function (httpRequest: IHttpRequest) {
        try {
            const userid = String(httpRequest.user._id);
            const friendid = httpRequest.params.id;
            await removeFriend(userid, friendid);

            return {
                statusCode: 200,
                body: { message: "Friend has been removed" },
            };
        } catch (err: any) {
            return {
                statusCode: err.statusCode || 400,
                body: { error: err.message },
            };
        }
    };
}
