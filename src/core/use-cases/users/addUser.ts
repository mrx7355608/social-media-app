import { userFactory } from "@/core/entities";
import { IDataSource } from "@/core/interfaces/data-source-generic.interface";
import { IUser, IUserInputData } from "@/core/interfaces/user.interfaces";
import { IErrorServices } from "@/services/interfaces/errorServices.interface";

export function addUserFactory({
    userDataSource,
    errorServices,
}: {
    userDataSource: IDataSource<IUser>;
    errorServices: IErrorServices;
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
        return await userDataSource.insert(validUser);
    };
}
