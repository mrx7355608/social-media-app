import { userFactory } from "@/core/entities";
import { IDataSource } from "@/core/interfaces/data-source-generic.interface";
import { IUserDBModel } from "@/core/interfaces/user.interfaces";
import { IErrorServices } from "@/services/interfaces/errorServices.interface";

export function removeFriendFactory(
    userDataSource: IDataSource<IUserDBModel>,
    errorServices: IErrorServices,
    isMongoId: (id: string) => boolean
) {
    return async function (userid: string, friendid: string) {
        if (!isMongoId(userid)) {
            return errorServices.validationError("User Id is invalid");
        }
        if (!isMongoId(friendid)) {
            return errorServices.validationError("Friend Id is invalid");
        }

        // Get user from db
        const user = await userDataSource.findById(userid);
        if (!user) {
            return errorServices.notFoundError("User not found");
        }

        // Check if friend exists in friend list
        const friendExists = user.friends.filter(
            (id) => String(id) === friendid
        )[0];
        if (!friendExists) {
            return errorServices.notFoundError("Friend not found");
        }

        const validUser = userFactory.create({
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            password: user.password,
            confirmPassword: user.password,
            friends: user.friends,
            pendingRequests: user.pendingRequests,
            isEmailVerified: user.isEmailVerified,
            profilePicture: user.profilePicture,
        });
        validUser.removeFriend(friendid);

        return await userDataSource.update(userid, {
            firstname: validUser.firstname,
            lastname: validUser.lastname,
            email: validUser.email,
            password: validUser.password,
            friends: validUser.friends,
            pendingRequests: validUser.pendingRequests,
            isEmailVerified: validUser.isEmailVerified,
            profilePicture: validUser.profilePicture,
        });
    };
}
