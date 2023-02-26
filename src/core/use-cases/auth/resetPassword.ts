import { userFactory } from "@/core/entities";
import { IDataSource } from "@/core/interfaces/data-source-generic.interface";
import { IUserDBModel } from "@/core/interfaces/user.interfaces";
import { IErrorServices } from "@/services/interfaces/errorServices.interface";
import { IHashServices } from "@/services/interfaces/hashServices.interface";
import { IJwtServices } from "@/services/interfaces/jwtServices.interface";

export function resetPasswordFactory(
    userDataSource: IDataSource<IUserDBModel>,
    errorServices: IErrorServices,
    jwtServices: IJwtServices,
    hashServices: IHashServices
) {
    return async function (
        token: string,
        password: string,
        confirmPassword: string
    ) {
        // Verify token
        const payload = jwtServices.verify(token);
        if (!payload) {
            return errorServices.authenticationError(
                "Auth token is invalid or expired"
            );
        }

        // Fetch user from db
        const user = await userDataSource.findById(payload.userid);
        if (!user) {
            return errorServices.notFoundError("User not found");
        }

        // Validate everything
        const validUser = userFactory.create({
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            password: password,
            confirmPassword: confirmPassword,
            friends: user.friends,
            pendingRequests: user.pendingRequests,
            profilePicture: user.profilePicture,
            isEmailVerified: user.isEmailVerified,
        });

        // Hash password
        const newHashedPassword = await hashServices.hash(validUser.password);

        // Update
        return await userDataSource.update(user._id, {
            firstname: validUser.firstname,
            lastname: validUser.lastname,
            email: validUser.email,
            password: newHashedPassword,
            friends: validUser.friends,
            pendingRequests: validUser.pendingRequests,
            profilePicture: validUser.profilePicture,
            isEmailVerified: validUser.isEmailVerified,
        });
    };
}
