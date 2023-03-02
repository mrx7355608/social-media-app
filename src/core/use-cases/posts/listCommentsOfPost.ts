import { ICommentDBModel } from "@/core/interfaces/comment.interfaces";
import { IPostDataSource } from "@/core/interfaces/postDataSource.itnerface";
import { IErrorServices } from "@/services/interfaces/errorServices.interface";

export function listCommentsOfPostFactory(
    postDataSource: IPostDataSource,
    errorServices: IErrorServices,
    isMongoId: (id: string) => boolean
) {
    return async function (postId: string) {
        if (!isMongoId(postId)) {
            return errorServices.validationError("Post Id is invalid");
        }

        const post = await postDataSource.findById(postId);
        if (!post) {
            return errorServices.notFoundError("Post not found");
        }

        return (await post.populate({
            path: "comments",
            select: "text author",
            populate: {
                path: "author",
                select: "firstname lastname profilePicture",
            },
        })) as ICommentDBModel[];
    };
}
