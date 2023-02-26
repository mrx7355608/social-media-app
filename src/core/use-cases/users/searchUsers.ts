import { UserDataSource } from "@/data/user.data";

export function searchUsersFactory(userDataSource: UserDataSource) {
    return async function (firstname: string, lastname: string, page: number) {
        const skipDocs = page * 10 - 10;
        return await userDataSource.search({ firstname, lastname }, skipDocs);
    };
}
