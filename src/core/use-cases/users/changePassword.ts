import { IErrorServices } from "@/services/interfaces/errorServices.interface";
import { IDataSource } from "@/core/interfaces/data-source-generic.interface";
import { IUser, IUserDBModel } from "@/core/interfaces/user.interfaces";
import { IHashServices } from "@/services/interfaces/hashServices.interface";
import { userFactory } from "@/core/entities";

export function changePasswordFactory(
    userDataSource: IDataSource<IUserDBModel>,
    errorServices: IErrorServices,
    hashServices: IHashServices,
    isMongoId: (id: string) => boolean
) {
    return async function (
        userid: string,
        oldPassword: string,
        newPassword: string,
        confirmNewPassword: string
    ) {
        if (!userid) {
            return errorServices.validationError("User Id is missing");
        }
        if (!isMongoId(userid)) {
            return errorServices.validationError("User Id is invalid");
        }
        const user = await userDataSource.findById(userid);
        if (!user) {
            return errorServices.notFoundError("User not found");
        }

        const isValidPassword = await hashServices.compare(
            user.password,
            oldPassword
        );
        if (!isValidPassword) {
            return errorServices.validationError("Old password is incorrect");
        }
        if (newPassword === oldPassword) {
            return errorServices.validationError(
                "You cannot use your old password as new password"
            );
        }

        const validUser = userFactory.create({
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            password: newPassword,
            confirmPassword: confirmNewPassword,
            isEmailVerified: user.isEmailVerified,
            friends: user.friends,
            profilePicture: user.profilePicture,
            pendingRequests: user.pendingRequests,
        });
        const newHashedPassword = await hashServices.hash(newPassword);
        return await userDataSource.update<IUser>(user._id, {
            firstname: validUser.firstname,
            lastname: validUser.lastname,
            email: validUser.email,
            password: newHashedPassword,
            isEmailVerified: validUser.isEmailVerified,
            friends: validUser.friends,
            profilePicture: validUser.profilePicture,
            pendingRequests: validUser.pendingRequests,
        });
    };
}
