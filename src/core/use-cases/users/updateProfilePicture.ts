import { userFactory } from "@/core/entities";
import { IDataSource } from "@/core/interfaces/data-source-generic.interface";
import { IUser, IUserDBModel } from "@/core/interfaces/user.interfaces";
import { IErrorServices } from "@/services/interfaces/errorServices.interface";

export function updateProfilePictureFactory(
    userDataSource: IDataSource<IUserDBModel>,
    errorServices: IErrorServices,
    isValidUrl: (url: string) => boolean
) {
    return async function (pictureUrl: string, userid: string) {
        if (!isValidUrl(pictureUrl)) {
            return errorServices.validationError("Invalid picture url");
        }

        const user = await userDataSource.findById(userid);
        if (!user) {
            return errorServices.notFoundError("User does not exist");
        }

        const validUser = userFactory.create({
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            password: user.password,
            confirmPassword: user.confirmPassword,
            pendingRequests: user.pendingRequests,
            friends: user.friends,
            profilePicture: user.profilePicture,
            isEmailVerified: user.isEmailVerified,
        });
        validUser.updateProfilePicture(pictureUrl);

        return await userDataSource.update<IUser>(userid, {
            firstname: validUser.firstname,
            lastname: validUser.lastname,
            email: validUser.email,
            password: validUser.password,
            isEmailVerified: validUser.isEmailVerified,
            profilePicture: validUser.profilePicture,
            pendingRequests: validUser.pendingRequests,
            friends: validUser.friends,
        });
    };
}
