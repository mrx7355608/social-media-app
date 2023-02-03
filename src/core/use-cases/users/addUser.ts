import { userFactory } from "@/core/entities";
import { IDataSource } from "@/core/interfaces/data-source-generic.interface";
import { IUser, IUserInputData } from "@/core/interfaces/user.interfaces";
import { IErrorServices } from "@/services/interfaces/errorServices.interface";
import { IHashServices } from "@/services/interfaces/hashServices.interface";

export function addUserFactory({
    userDataSource,
    errorServices,
    hashServices,
}: {
    userDataSource: IDataSource<IUser>;
    errorServices: IErrorServices;
    hashServices: IHashServices;
}) {
    return async function (userData: IUserInputData) {
        if (!userData) {
            return errorServices.validationError("User data is missing");
        }

        const userExists = await userDataSource.findOne({
            email: userData.email,
        });
        if (userExists) {
            return errorServices.notFoundError("User already exists");
        }

        const newUserData: IUser = {
            ...userData,
            friends: [],
            pendingRequests: [],
        };
        const validUser = userFactory.create(newUserData);
        const hashedPassword = await hashServices.hash(validUser.password);

        // TODO: in actual implementation of user data source
        // make sure to remove the confirmPassword field from userData

        return await userDataSource.insert({
            firstname: validUser.firstname,
            lastname: validUser.lastname,
            email: validUser.lastname,
            password: hashedPassword,
            confirmPassword: validUser.confirmPassword,
            friends: validUser.friends,
            pendingRequests: validUser.pendingRequests,
        });
    };
}
