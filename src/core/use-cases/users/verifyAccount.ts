import { userFactory } from "@/core/entities";
import { IDataSource } from "@/core/interfaces/data-source-generic.interface";
import { IUserDBModel } from "@/core/interfaces/user.interfaces";
import { IErrorServices } from "@/services/interfaces/errorServices.interface";
import { IJwtServices } from "@/services/interfaces/jwtServices.interface";

export function verifyAccountFactory({
    userDB,
    errorServices,
    jwtServices,
}: {
    userDB: IDataSource<IUserDBModel>;
    errorServices: IErrorServices;
    jwtServices: IJwtServices;
}) {
    return async function (token: string) {
        if (!token) {
            return errorServices.authenticationError("Auth Token is missing");
        }

        const payload = jwtServices.verify(token);
        if (!payload) {
            return errorServices.authenticationError(
                "Auth token is invalid or expired, request for a new verification link"
            );
        }

        const user = await userDB.findById(payload.userid);
        if (!user) {
            return errorServices.notFoundError("User does not exist anymore");
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
        validUser.verifyEmail();

        return await userDB.update(user._id, {
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
