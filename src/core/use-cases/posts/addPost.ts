import { postFactory } from "@/core/entities";
import { IPost, IPostDBModel } from "@/core/entities/post.interfaces";
import { IDataSource } from "@/core/interfaces/data-source-generic.interface";

export function addPostFactory(postDataSource: IDataSource<IPostDBModel>) {
    return async function (postData: IPost) {
        const validPost = postFactory.create(postData);
        return await postDataSource.insert<IPost>({
            author: validPost.author,
            body: validPost.body,
            likes: validPost.likes,
            comments: validPost.comments,
        });
    };
}
