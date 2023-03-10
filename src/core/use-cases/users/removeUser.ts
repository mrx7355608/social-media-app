import { IDataSource } from "@/core/interfaces/data-source-generic.interface";
import { IUserDBModel } from "@/core/interfaces/user.interfaces";
import { IErrorServices } from "@/services/interfaces/errorServices.interface";

export function removeUserFactory(
    userDataSource: IDataSource<IUserDBModel>,
    errorServices: IErrorServices,
    isMongoId: (id: string) => boolean
) {
    return async function (userid: string) {
        if (!isMongoId(userid)) {
            return errorServices.validationError("User Id is invalid");
        }

        const user = await userDataSource.findById(userid);
        if (!user) {
            return errorServices.notFoundError("User does not exist");
        }
        return await userDataSource.deleteData(userid);
    };
}
