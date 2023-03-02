import { postFactory } from "@/core/entities";
import { IPostDataSource } from "@/core/interfaces/postDataSource.itnerface";
import { IErrorServices } from "@/services/interfaces/errorServices.interface";

export function likePostFactory(
    postDataSource: IPostDataSource,
    errorServices: IErrorServices,
    isMongoId: (id: string) => boolean
) {
    return async function (postId: string, userId: string) {
        if (!isMongoId(postId)) {
            return errorServices.validationError("Post Id is invalid");
        }

        const post = await postDataSource.findById(postId);
        if (!post) {
            return errorServices.notFoundError("Post not found");
        }

        const validPost = postFactory.create({
            author: post.author,
            body: post.body,
            likes: post.likes,
            comments: post.comments,
            createdAt: post.createdAt,
            updatedAt: post.updatedAt,
        });

        // If the post is already liked then, unlike it / remove like
        if (post.likes.includes(userId)) {
            validPost.removeLike(userId);
        } else {
            // Otherwise like the post
            validPost.addLike(userId);
        }

        return await postDataSource.update(postId, {
            likes: validPost.likes,
            updatedAt: new Date(),
        });
    };
}
