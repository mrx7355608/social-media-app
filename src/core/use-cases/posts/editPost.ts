import { postFactory } from "@/core/entities";
import { IPostDataSource } from "@/core/interfaces/postDataSource.itnerface";
import { IErrorServices } from "@/services/interfaces/errorServices.interface";

export function editPostFactory(
    postDataSource: IPostDataSource,
    errorServices: IErrorServices,
    isMongoId: (id: string) => boolean
) {
    return async function (postId: string, userId: string, changes: Object) {
        // Validate Post Id
        if (!isMongoId(postId)) {
            return errorServices.validationError("Post Id is invalid");
        }

        // Check if post exists
        const postExists = await postDataSource.findById(postId);
        if (!postExists) {
            return errorServices.notFoundError("Post not found");
        }

        // Check if the user owns the post
        if (String(postExists.author) !== userId) {
            return errorServices.forbiddenError("You do not own this post");
        }

        const newPostData = Object.assign(postExists, changes);
        const validPost = postFactory.create(newPostData);

        return await postDataSource.update(postId, {
            body: validPost.body,
            updatedAt: new Date(),
        });
    };
}
