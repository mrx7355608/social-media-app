import { IDataSource } from "@/core/interfaces/data-source-generic.interface";
import { IUserDBModel } from "@/core/interfaces/user.interfaces";
import { PostDataSource } from "@/data/post.data";
import { IErrorServices } from "@/services/interfaces/errorServices.interface";

export function listMyPostsFactory(
    userDataSource: IDataSource<IUserDBModel>,
    postDataSource: PostDataSource,
    errorServices: IErrorServices,
    isMongoId: (id: string) => boolean
) {
    return async function (userId: string) {
        if (!isMongoId(userId)) {
            return errorServices.validationError("User Id is invalid");
        }
        const user = await userDataSource.findById(userId);
        if (!user) {
            return errorServices.notFoundError("User not found");
        }

        return await postDataSource.findAllWithFilter({
            "author.authorId": userId,
        });
    };
}
