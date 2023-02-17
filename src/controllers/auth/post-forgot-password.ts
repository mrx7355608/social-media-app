import { IUserDBModel } from "@/core/interfaces/user.interfaces";
import { IHttpRequest } from "../interfaces/httpRequest.interface";

export function forgotPasswordController({
    forgotPassword,
}: {
    forgotPassword: (email: string) => Promise<IUserDBModel>;
}) {
    return async function (httpRequest: IHttpRequest) {
        try {
            const email = httpRequest.body.email;
            if (!email)
                return {
                    statusCode: 400,
                    body: { error: "Please enter your email" },
                };

            const user = await forgotPassword(email);
            const message = `A password reset email has been sent to ${user.email}`;
            return {
                statusCode: 200,
                body: { message },
            };
        } catch (err: any) {
            return {
                statusCode: err.statusCode || 400,
                body: { error: err.message },
            };
        }
    };
}
