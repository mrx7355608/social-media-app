import { UserDataSource } from "@/data/user.data";

export function searchUsersFactory(userDataSource: UserDataSource) {
    return async function (firstname: string, lastname: string) {
        console.log({ firstname, lastname });
        return await userDataSource.search({ firstname, lastname });
    };
}
