import { IUserDBModel } from "@/core/interfaces/user.interfaces";
import { IHttpRequest } from "../interfaces/httpRequest.interface";
import config from "@/config/index";

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
            if (!userName) {
                return {
                    statusCode: 400,
                    body: { error: "Please enter a user's name to search" },
                };
            }
            const [firstname, lastname] = userName.split(" ");
            const users = await searchUsers(firstname, lastname);
            const response = users.map((user) => {
                return {
                    fullname: `${user.firstname} ${user.lastname}`,
                    profilePicture: user.profilePicture,
                    _id: user._id,
                    linkToProfile: `${config.apiUrl}/users/${user._id}`,
                    createdAt: new Date(user.createdAt).toDateString(),
                };
            });
            return {
                statusCode: 200,
                body: response,
            };
        } catch (err: any) {
            return {
                statusCode: err.statusCode || 400,
                body: { error: err.message },
            };
        }
    };
}
