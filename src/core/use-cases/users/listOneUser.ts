import { IDataSource } from "@/core/interfaces/data-source-generic.interface";
import { IUserDBModel } from "@/core/interfaces/user.interfaces";
import { IErrorServices } from "@/services/interfaces/errorServices.interface";

interface IListOneUserHelpers {
    userDataSource: IDataSource<IUserDBModel>;
    isMongoId(id: string): boolean;
    errorServices: IErrorServices;
}

export function listOneUserFactory({
    userDataSource,
    errorServices,
    isMongoId,
}: IListOneUserHelpers) {
    return async function (userid: string): Promise<IUserDBModel> {
        if (!userid) {
            return errorServices.validationError("User ID is missing");
        }
        if (!isMongoId(userid)) {
            return errorServices.invalidIdError("User ID is invalid");
        }

        const user = await userDataSource.findById(userid);
        if (!user) {
            return errorServices.notFoundError("User not found");
        }

        return user;
    };
}
