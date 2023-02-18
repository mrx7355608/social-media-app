import { postFactory } from "@/core/entities";
import { IPost, IPostModel } from "@/core/entities/post.interfaces";
import { IDataSource } from "@/core/interfaces/data-source-generic.interface";
import { IErrorServices } from "@/services/interfaces/errorServices.interface";

export function editPostFactory(
    postDataSource: IDataSource<IPostModel>,
    errorServices: IErrorServices,
    isMongoId: (id: string) => boolean
) {
    return async function (postId: string, changes: Object) {
        if (!isMongoId(postId)) {
            return errorServices.invalidIdError("Post Id is invalid");
        }

        const postExists = await postDataSource.findById(postId);
        if (!postExists) {
            return errorServices.notFoundError("Post not found");
        }

        const newPostData = Object.assign(postExists, changes);
        const validPost = postFactory.create(newPostData);

        return await postDataSource.update<IPost>(postId, {
            author: validPost.author,
            body: validPost.body,
            likes: validPost.likes,
            comments: validPost.comments,
        });
    };
}
