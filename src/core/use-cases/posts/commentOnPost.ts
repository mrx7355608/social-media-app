import { postFactory } from "@/core/entities";
import { IComment } from "@/core/interfaces/comment.interfaces";
import { IPostDataSource } from "@/core/interfaces/postDataSource.itnerface";
import { CommentDataSource } from "@/data/comment.data";
import { IErrorServices } from "@/services/interfaces/errorServices.interface";
import { addCommentFactory } from "../comments/addComment";

const addComment = addCommentFactory(new CommentDataSource());

export function commentOnPostFactory(
    postDataSource: IPostDataSource,
    errorServices: IErrorServices,
    isMongoId: (id: string) => boolean
) {
    return async function (postId: string, commentData: IComment) {
        // validate post id
        if (!isMongoId(postId)) {
            return errorServices.validationError("Post Id is invalid");
        }

        // Find post
        const post = await postDataSource.findById(postId);
        if (!post) {
            return errorServices.notFoundError("Post not found");
        }

        // create post entity
        const validPost = postFactory.create({
            author: post.author,
            body: post.body,
            likes: post.likes,
            comments: post.comments,
            createdAt: post.createdAt,
            updatedAt: post.updatedAt,
        });

        // add comment
        const newComment = await addComment(commentData);
        validPost.addComment(newComment._id);

        // update
        await postDataSource.update(postId, {
            comments: validPost.comments,
            updatedAt: new Date(),
        });

        // Return newly created comment
        return newComment;
    };
}
