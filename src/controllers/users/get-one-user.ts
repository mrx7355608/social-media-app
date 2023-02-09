import { IUser, IUserDBModel } from "@/core/interfaces/user.interfaces";
import { IHttpRequest } from "../interfaces/httpRequest.interface";

export function getOneUserController({
    listOneUser,
}: {
    listOneUser: (id: string) => Promise<IUserDBModel>;
}) {
    return async function (httpRequest: IHttpRequest) {
        try {
            const user = await listOneUser(httpRequest.params.id);

            // Remove un-wanted fields
            (user as any).password = undefined;
            (user as any).email = undefined;
            (user as any).__v = undefined;
            (user as any).friends = undefined;
            (user as any).photos = undefined;
            (user as any).isEmailVerified = undefined;
            (user as any).pendingRequests = undefined;
            return {
                statusCode: 200,
                body: user,
            };
        } catch (err: any) {
            return {
                statusCode: err.statusCode || 400,
                body: { error: err.message },
            };
        }
    };
}
