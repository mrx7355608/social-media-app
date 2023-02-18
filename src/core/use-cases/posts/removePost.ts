import { IPostDBModel } from "@/core/entities/post.interfaces";
import { IDataSource } from "@/core/interfaces/data-source-generic.interface";
import { IErrorServices } from "@/services/interfaces/errorServices.interface";

export function removePostFactory(
    postDataSource: IDataSource<IPostDBModel>,
    errorServices: IErrorServices,
    isMongoId: (id: string) => boolean
) {
    return async function (postId: string, userId: string) {
        if (!isMongoId(postId)) {
            return errorServices.invalidIdError("Post Id is invalid");
        }

        const postExists = await postDataSource.findById(postId);
        if (!postExists) {
            return errorServices.notFoundError("Post not found");
        }

        // Check if the user owns the post
        if (postExists.author.authorId !== userId) {
            return errorServices.forbiddenError("You do not own this post");
        }

        return await postDataSource.deleteData(postId);
    };
}
