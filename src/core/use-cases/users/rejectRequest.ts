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
        if (!isMongoId(requestId)) {
            return errorServices.validationError("Request Id is invalid");
        }
        if (!isMongoId(userid)) {
            return errorServices.validationError("User Id is invalid");
        }

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
}
