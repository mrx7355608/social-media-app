import { IPostDBModel } from "@/core/entities/post.interfaces";
import { IDataSource } from "@/core/interfaces/data-source-generic.interface";
import { IErrorServices } from "@/services/interfaces/errorServices.interface";

export function listOnePostFactory(
    postDataSource: IDataSource<IPostDBModel>,
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
