import { IUserDBModel } from "@/core/interfaces/user.interfaces";
import { IHttpRequest } from "../interfaces/httpRequest.interface";

export function verifyAccountController({
    verifyAccount,
}: {
    verifyAccount: (token: string) => Promise<IUserDBModel>;
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

            await verifyAccount(token);
            return {
                statusCode: 200,
                body: { verified: true },
            };
        } catch (err: any) {
            return {
                statusCode: err.statusCode || 400,
                body: { message: err.message },
            };
        }
    };
}
