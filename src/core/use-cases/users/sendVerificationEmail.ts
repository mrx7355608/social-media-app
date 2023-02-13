import { IDataSource } from "@/core/interfaces/data-source-generic.interface";
import { IUserDBModel } from "@/core/interfaces/user.interfaces";
import { IErrorServices } from "@/services/interfaces/errorServices.interface";
import { IEmailServices } from "@/services/interfaces/emailServices.interface";

export function sendVerificationEmailFactory({
    userDataSource,
    errorServices,
    emailServices,
    emailValidator,
}: {
    userDataSource: IDataSource<IUserDBModel>;
    errorServices: IErrorServices;
    emailServices: IEmailServices;
    emailValidator: (str: string) => boolean;
}) {
    return async function (email: string) {
        if (!email) {
            return errorServices.validationError("Please enter your email");
        }

        if (!emailValidator(email)) {
            return errorServices.validationError("Invalid email");
        }

        const user = await userDataSource.findOne({ email });
        if (!user) {
            return errorServices.notFoundError(
                "Account with this email does not exist"
            );
        }

        await emailServices.sendAccountVerificationEmail(user._id, user.email);
        return user;
    };
}