import { IUser, IUserDBModel } from "@/core/interfaces/user.interfaces";
import { IHttpRequest } from "../interfaces/httpRequest.interface";

interface IFriend {
    fullname: string;
    profilePicture: string;
    linkToProfile: string;
    id: string;
}

export function getCurrentUserFriendsController() {
    return async function (httpRequest: IHttpRequest) {
        const currentUser = httpRequest.user;
        await currentUser.populate<IUserDBModel>({
            path: "friends",
            select: "firstname lastname profilePicture",
        });

        return {
            statusCode: 200,
            body: { friends: currentUser.friends },
        };
    };

    function createFullname(firstname: string, lastname: string): string {
        // Capitalize first letter of the name
        const fnameFirstCaps = firstname.substring(0, 1).toUpperCase();
        const lnameFirstCaps = lastname.substring(0, 1).toUpperCase();
        return `${fnameFirstCaps + firstname.substring(1)} ${
            lnameFirstCaps + lastname.substring(1)
        }`;
    }
}
