import { IHttpRequest } from "../interfaces/httpRequest.interface";

export function getCurrentUserController() {
    return async function (httpRequest: IHttpRequest) {
        const currentUser = httpRequest.user;
        const fullname = createFullname(
            currentUser.firstname,
            currentUser.lastname
        );
        const response = {
            id: currentUser._id,
            fullname,
            profilePicture: currentUser.profilePicture,
            friends: currentUser.friends,
            pendingRequests: currentUser.pendingRequests,
        };

        return {
            statusCode: 200,
            body: response,
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
