import { IUser, IUserDBModel } from "@/core/interfaces/user.interfaces";
import { IHttpRequest } from "../interfaces/httpRequest.interface";

export function postRegisterUserController({
    addUser,
}: {
    addUser: (userData: IUser) => Promise<IUserDBModel>;
}) {
    return async function (httpRequset: IHttpRequest) {
        try {
            const userInput = httpRequset.body;
            const newUserData: IUser = {
                firstname: userInput.firstname,
                lastname: userInput.lastname,
                email: userInput.email,
                password: userInput.password,
                confirmPassword: userInput.confirmPassword,
                profilePicture:
                    "https://www.cloudinary.com/images/default_user.png",
                friends: [],
                pendingRequests: [],
                isEmailVerified: false,
            };

            const newUser = await addUser(newUserData);
            const message = `A verification email has been sent to ${newUser.email}. You must verify your account before you login`;
            return {
                statusCode: 201,
                body: { message },
            };
        } catch (err: any) {
            return {
                statusCode: err.statusCode || 400,
                body: { error: err.message },
            };
        }
    };
}
