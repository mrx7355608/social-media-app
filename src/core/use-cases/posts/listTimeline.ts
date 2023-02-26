import { IPostDBModel } from "@/core/entities/post.interfaces";
import { IDataSource } from "@/core/interfaces/data-source-generic.interface";
import { IUserDBModel } from "@/core/interfaces/user.interfaces";
import { PostDataSource } from "@/data/post.data";
import { IErrorServices } from "@/services/interfaces/errorServices.interface";

export function listTimelineFactory(
    userDataSource: IDataSource<IUserDBModel>,
    postDataSource: PostDataSource
) {
    return async function (userId: string, page: number) {
        const user = (await userDataSource.findById(userId)) as IUserDBModel;
        const userFriendsIds = [...user.friends, userId];
        const skipDocs = page * 10 - 10;
        return postDataSource.timeline(userFriendsIds, skipDocs);
    };
}
