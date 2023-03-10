import { IErrorServices } from "@/services/interfaces/errorServices.interface";
import { IPostDataSource } from "@/core/interfaces/postDataSource.itnerface";

export function removePostFactory(
    postDataSource: IPostDataSource,
    errorServices: IErrorServices,
    isMongoId: (id: string) => boolean
) {
    return async function (postId: string, userId: string) {
        if (!isMongoId(postId)) {
            return errorServices.validationError("Post Id is invalid");
        }

        const postExists = await postDataSource.findById(postId);
        if (!postExists) {
            return errorServices.notFoundError("Post not found");
        }

        // Check if the user owns the post
        if (postExists.author !== userId) {
            return errorServices.forbiddenError("You do not own this post");
        }

        return await postDataSource.deletePost(postId);
    };
}
