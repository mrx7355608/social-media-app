import { IUserDBModel } from "@/core/interfaces/user.interfaces";
import { IHttpRequest } from "../interfaces/httpRequest.interface";

export function postSearchController({
    searchUsers,
}: {
    searchUsers: (
        firstname: string,
        lastname: string
    ) => Promise<IUserDBModel[]>;
}) {
    return async function (httpRequest: IHttpRequest) {
        try {
            const userName = httpRequest.query.user;
            const [firstname, lastname] = userName.split(" ");
            const users = await searchUsers(firstname, lastname);
            return {
                statusCode: 200,
                body: users,
            };
        } catch (err: any) {
            return {
                statusCode: err.statusCode || 400,
                body: { error: err.message },
            };
        }
    };
}
