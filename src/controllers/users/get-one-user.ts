import { IUser, IUserDBModel } from "@/core/interfaces/user.interfaces";
import { IHttpRequest } from "../interfaces/httpRequest.interface";

export function getOneUserController({
    listOneUser,
}: {
    listOneUser: (id: string) => Promise<IUserDBModel>;
}) {
    return async function (httpRequest: IHttpRequest) {
        try {
            const user = await listOneUser(httpRequest.params.id);
            const fullname = createFullname(user.firstname, user.lastname);
            const response = {
                id: user._id,
                fullname,
                profilePicture: user.profilePicture,
                friends: user.friends,
            };

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

    function createFullname(firstname: string, lastname: string): string {
        // Capitalize first letter of the name
        const fnameFirstCaps = firstname.substring(0, 1).toUpperCase();
        const lnameFirstCaps = lastname.substring(0, 1).toUpperCase();
        return `${fnameFirstCaps + firstname.substring(1)} ${
            lnameFirstCaps + lastname.substring(1)
        }`;
    }
}
