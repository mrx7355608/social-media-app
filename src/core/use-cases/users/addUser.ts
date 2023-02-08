import { userFactory } from "@/core/entities";
import { IDataSource } from "@/core/interfaces/data-source-generic.interface";
import { IUser, IUserDBModel } from "@/core/interfaces/user.interfaces";
import { IErrorServices } from "@/services/interfaces/errorServices.interface";
import { IHashServices } from "@/services/interfaces/hashServices.interface";

export function addUserFactory({
    userDataSource,
    errorServices,
    hashServices,
}: {
    userDataSource: IDataSource<IUserDBModel>;
    errorServices: IErrorServices;
    hashServices: IHashServices;
}) {
    return async function (userData: IUser) {
        if (!userData || Object.keys(userData).length < 1) {
            return errorServices.validationError("User data is missing");
        }

        const userExists = await userDataSource.findOne({
            email: userData.email,
        });

        if (userExists) {
            return errorServices.notFoundError("User already exists");
        }

        // Create a new user
        const validUser = userFactory.create(userData);
        const hashedPassword = await hashServices.hash(validUser.password);

        // *** TODO: send a verification email *** //

        return await userDataSource.insert<IUser>({
            firstname: validUser.firstname,
            lastname: validUser.lastname,
            email: validUser.email,
            password: hashedPassword,
            profilePicture: validUser.profilePicture,
            isEmailVerified: validUser.isEmailVerified,
            friends: validUser.friends,
            pendingRequests: validUser.pendingRequests,
        });
    };
}
