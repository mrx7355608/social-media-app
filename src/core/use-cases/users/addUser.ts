import { userFactory } from "@/core/entities";
import { IDataSource } from "@/core/interfaces/data-source-generic.interface";
import {
    IUser,
    IUserDBModel,
    IUserInputData,
} from "@/core/interfaces/user.interfaces";
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

        const newUserData: IUser = Object.assign(userData, {
            friends: [],
            pendingRequests: [],
        });

        const validUser = userFactory.create(newUserData);
        const hashedPassword = await hashServices.hash(validUser.password);

        return await userDataSource.insert<IUser>({
            firstname: validUser.firstname,
            lastname: validUser.lastname,
            email: validUser.email,
            password: hashedPassword,
            friends: validUser.friends,
            pendingRequests: validUser.pendingRequests,
        });
    };
}
