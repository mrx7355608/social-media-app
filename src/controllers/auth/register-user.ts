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
            if (!userInput || Object.keys(userInput).length < 1) {
                return {
                    statusCode: 400,
                    body: { error: "User data is missing" },
                };
            }

            const newUserData: IUser = {
                firstname: userInput.firstname,
                lastname: userInput.lastname,
                email: userInput.email,
                password: userInput.password,
                confirmPassword: userInput.confirmPassword,
                profilePicture:
                    "https://res.cloudinary.com/doemiclic/image/upload/v1676605199/user_d4gype.png",
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
