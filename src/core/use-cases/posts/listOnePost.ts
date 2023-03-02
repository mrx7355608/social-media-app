import { IPostDataSource } from "@/core/interfaces/postDataSource.itnerface";
import { IErrorServices } from "@/services/interfaces/errorServices.interface";

export function listOnePostFactory(
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

        return post;
    };
}
