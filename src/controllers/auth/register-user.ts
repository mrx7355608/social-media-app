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

            // Remove un-wanted fields
            (newUser as any).isEmailVerified = undefined;
            (newUser as any).friends = undefined;
            (newUser as any).photos = undefined;
            (newUser as any).password = undefined;
            (newUser as any).email = undefined;
            (newUser as any).__v = undefined;
            (newUser as any).pendingRequests = undefined;

            return {
                statusCode: 201,
                body: { user: newUser },
            };
        } catch (err: any) {
            return {
                statusCode: err.statusCode || 400,
                body: { error: err.message },
            };
        }
    };
}
