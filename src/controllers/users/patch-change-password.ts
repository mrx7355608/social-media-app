import { IUserDBModel } from "@/core/interfaces/user.interfaces";
import { IHttpRequest } from "../interfaces/httpRequest.interface";

export function changePasswordController({
    changePassword,
}: {
    changePassword: (
        userid: string,
        oldPassword: string,
        newPassword: string,
        confirmNewPassword: string
    ) => Promise<IUserDBModel>;
}) {
    return async function (httpRequest: IHttpRequest) {
        try {
            const userid = String(httpRequest.user._id);
            const oldPassword = httpRequest.body.oldPassword;
            const newPassword = httpRequest.body.newPassword;
            const confirmNewPassword = httpRequest.body.confirmNewPassword;

            await changePassword(
                userid,
                oldPassword,
                newPassword,
                confirmNewPassword
            );
            return {
                statusCode: 200,
                body: { message: "Password changed successfully!" },
            };
        } catch (err: any) {
            console.log(err);
            return {
                statusCode: err.statusCode || 400,
                body: { error: err.message },
            };
        }
    };
}
