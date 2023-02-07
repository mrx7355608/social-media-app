import { IDataSource } from "@/core/interfaces/data-source-generic.interface";
import { IUserDBModel } from "@/core/interfaces/user.interfaces";
import { IErrorServices } from "@/services/interfaces/errorServices.interface";

export function removeUserFactory({
    userDB,
    isMongoId,
    errorServices,
}: {
    userDB: IDataSource<IUserDBModel>;
    errorServices: IErrorServices;
    isMongoId: (id: string) => boolean;
}) {
    return async function (userid: string) {
        if (!userid) {
            return errorServices.validationError("User Id is missing");
        }
        if (!isMongoId(userid)) {
            return errorServices.invalidIdError("User Id is invalid");
        }

        const user = await userDB.findById(userid);
        if (!user) {
            return errorServices.notFoundError("User does not exist");
        }
        return await userDB.deleteData(userid);
    };
}
