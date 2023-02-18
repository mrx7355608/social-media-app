import { postFactory } from "@/core/entities";
import { IPostDBModel } from "@/core/entities/post.interfaces";
import { IDataSource } from "@/core/interfaces/data-source-generic.interface";
import { IErrorServices } from "@/services/interfaces/errorServices.interface";

export function commentOnPostFactory(
    postDataSource: IDataSource<IPostDBModel>,
    errorServices: IErrorServices,
    isMongoId: (id: string) => boolean
) {
    return async function (postId: string, commentId: string) {
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
        });

        // TODO: search internet if comment should be created here or in the controller
        validPost.addComment(commentId);

        return await postDataSource.update(postId, {
            author: validPost.author,
            body: validPost.body,
            likes: validPost.likes,
            comments: validPost.comments,
        });
    };
}
