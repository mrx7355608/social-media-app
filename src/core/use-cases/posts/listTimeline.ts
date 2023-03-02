import { IDataSource } from "@/core/interfaces/data-source-generic.interface";
import { IPostDataSource } from "@/core/interfaces/postDataSource.itnerface";
import { IUserDBModel } from "@/core/interfaces/user.interfaces";

export function listTimelineFactory(
    userDataSource: IDataSource<IUserDBModel>,
    postDataSource: IPostDataSource
) {
    return async function (userId: string, page: number) {
        const user = (await userDataSource.findById(userId)) as IUserDBModel;
        const userFriendsIds = [...user.friends, userId];
        const skipDocs = page * 10 - 10;
        return postDataSource.timeline(userFriendsIds, skipDocs);
    };
}
