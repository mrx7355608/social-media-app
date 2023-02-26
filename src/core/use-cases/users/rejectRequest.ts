import { userFactory } from "@/core/entities";
import { IDataSource } from "@/core/interfaces/data-source-generic.interface";
import { IUser, IUserDBModel } from "@/core/interfaces/user.interfaces";
import { IErrorServices } from "@/services/interfaces/errorServices.interface";

export function rejectRequestFactory(
    userDataSource: IDataSource<IUserDBModel>,
    errorServices: IErrorServices,
    isMongoId: (id: string) => boolean
) {
    return async function (requestId: string, userid: string) {
        // validate ids
        validateId(requestId, "Request");
        validateId(userid, "User");

        // fetch user
        const user = await userDataSource.findById(userid);
        if (!user) {
            return errorServices.notFoundError("User not found");
        }

        const isRequestPending = user.pendingRequests.filter(
            (reqs) => reqs.friendId === requestId
        )[0];
        if (!isRequestPending) {
            return errorServices.notFoundError("Request not found");
        }

        // Create user entity
        const validUser = userFactory.create({
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            password: user.password,
            confirmPassword: user.password,
            isEmailVerified: user.isEmailVerified,
            friends: user.friends,
            profilePicture: user.profilePicture,
            pendingRequests: user.pendingRequests,
        });
        validUser.rejectRequest(requestId);

        return await userDataSource.update<IUser>(userid, {
            firstname: validUser.firstname,
            lastname: validUser.lastname,
            email: validUser.email,
            password: validUser.password,
            isEmailVerified: user.isEmailVerified,
            profilePicture: validUser.profilePicture,
            friends: validUser.friends,
            pendingRequests: validUser.pendingRequests,
        });
    };

    function validateId(id: string, label: string): void {
        if (!id) {
            return errorServices.validationError(`${label} Id is missing`);
        }
        if (!isMongoId(id)) {
            return errorServices.validationError(`${label} Id is invalid`);
        }
    }
}
