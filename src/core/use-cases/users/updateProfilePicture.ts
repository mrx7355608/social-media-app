import { userFactory } from "@/core/entities";
import { IDataSource } from "@/core/interfaces/data-source-generic.interface";
import { IUser, IUserDBModel } from "@/core/interfaces/user.interfaces";
import { IErrorServices } from "@/services/interfaces/errorServices.interface";

export function updateProfilePictureFactory({
    userDB,
    isValidUrl,
    errorServices,
}: {
    userDB: IDataSource<IUserDBModel>;
    errorServices: IErrorServices;
    isValidUrl: (url: string) => boolean;
}) {
    return async function (pictureUrl: string, userid: string) {
        if (!pictureUrl) {
            return errorServices.validationError("");
        }
        if (!isValidUrl(pictureUrl)) {
            return errorServices.validationError("");
        }

        const user = await userDB.findById(userid);
        if (!user) {
            return errorServices.notFoundError("User does not exist");
        }

        const validUser = userFactory.create(user);
        validUser.updateProfilePicture(pictureUrl);

        return await userDB.update<IUser>(userid, {
            firstname: validUser.firstname,
            lastname: validUser.lastname,
            email: validUser.lastname,
            password: validUser.password,
            isEmailVerified: validUser.isEmailVerified,
            profilePicture: validUser.profilePicture,
            pendingRequests: validUser.pendingRequests,
            friends: validUser.friends,
        });
    };
}
