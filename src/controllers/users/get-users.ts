import { IPaginationData } from "@/core/interfaces/data-source-generic.interface";
import { IUserDBModel } from "@/core/interfaces/user.interfaces";
import { IHttpRequest } from "../interfaces/httpRequest.interface";

export function getUsersController({
    listAllUsers,
}: {
    listAllUsers: ({
        limit,
        page,
        sort,
    }: IPaginationData) => Promise<IUserDBModel[]>;
}) {
    return async function (httpRequest: IHttpRequest) {
        try {
            const users = await listAllUsers({
                limit: httpRequest.query.limit,
                page: httpRequest.query.page,
                sort: httpRequest.query.sort,
            });

            return {
                statusCode: 200,
                body: users,
            };
        } catch (err: any) {
            return {
                statusCode: err.statusCode || 400,
                body: { error: err.message },
            };
        }
    };
}
