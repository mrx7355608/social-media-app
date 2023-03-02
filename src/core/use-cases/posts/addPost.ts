import { postFactory } from "@/core/entities";
import { IPost } from "@/core/interfaces/post.interfaces";
import { IPostDataSource } from "@/core/interfaces/postDataSource.itnerface";

export function addPostFactory(postDataSource: IPostDataSource) {
    return async function (postData: IPost) {
        const validPost = postFactory.create(postData);
        return await postDataSource.insert({
            author: validPost.author,
            body: validPost.body,
            likes: validPost.likes,
            comments: validPost.comments,
            createdAt: validPost.createdAt,
            updatedAt: validPost.updatedAt,
        });
    };
}
