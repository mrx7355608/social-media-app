import { IDataSource } from "@/core/interfaces/data-source-generic.interface";
import { IUserDBModel } from "@/core/interfaces/user.interfaces";
import { IErrorServices } from "@/services/interfaces/errorServices.interface";

export function listOneUserFactory(
    userDataSource: IDataSource<IUserDBModel>,
    errorServices: IErrorServices,
    isMongoId: (id: string) => boolean
) {
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
