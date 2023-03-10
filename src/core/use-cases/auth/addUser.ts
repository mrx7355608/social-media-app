import { userFactory } from "@/core/entities";
import { IDataSource } from "@/core/interfaces/data-source-generic.interface";
import { IUser, IUserDBModel } from "@/core/interfaces/user.interfaces";
import { IEmailServices } from "@/services/interfaces/emailServices.interface";
import { IErrorServices } from "@/services/interfaces/errorServices.interface";
import { IHashServices } from "@/services/interfaces/hashServices.interface";

export function addUserFactory(
    userDataSource: IDataSource<IUserDBModel>,
    errorServices: IErrorServices,
    hashServices: IHashServices,
    emailServices: IEmailServices
) {
    return async function (userData: IUser) {
        // Vaidate user data and create a new user
        const validUser = userFactory.create(userData);

        // Check if the user exists
        const userExists = await userDataSource.findOne({
            email: userData.email,
        });
        if (userExists) {
            return errorServices.validationError("User already exists");
        }

        // Hash user password
        const hashedPassword = await hashServices.hash(validUser.password);

        // Add user in db
        const newUser = await userDataSource.insert<IUser>({
            firstname: validUser.firstname,
            lastname: validUser.lastname,
            email: validUser.email,
            password: hashedPassword,
            profilePicture: validUser.profilePicture,
            isEmailVerified: validUser.isEmailVerified,
            friends: validUser.friends,
            pendingRequests: validUser.pendingRequests,
        });

        // Add user to database
        await emailServices.sendAccountVerificationEmail(
            newUser._id,
            newUser.email
        );

        return newUser;
    };
}
