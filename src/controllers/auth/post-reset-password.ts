import { IUserDBModel } from "@/core/interfaces/user.interfaces";
import { IHttpRequest } from "../interfaces/httpRequest.interface";

export function resetPasswordController({
    resetPassword,
}: {
    resetPassword: ({
        token,
        password,
        confirmPassword,
    }: {
        token: string;
        password: string;
        confirmPassword: string;
    }) => Promise<IUserDBModel>;
}) {
    return async function (httpRequest: IHttpRequest) {
        try {
            const token: string = httpRequest.query.token;
            if (!token)
                return {
                    statusCode: 400,
                    body: { error: "Auth token is missing" },
                };

            if (typeof token !== "string")
                return {
                    statusCode: 400,
                    body: { error: "Auth token should be a text" },
                };

            const password: string = httpRequest.body.password;
            const confirmPassword: string = httpRequest.body.confirmPassword;
            await resetPassword({
                token,
                password,
                confirmPassword,
            });

            return {
                statusCode: 200,
                body: { message: "Password has been reset successfully!" },
            };
        } catch (err: any) {
            return {
                statusCode: err.statusCode || 400,
                body: { error: err.message },
            };
        }
    };
}
