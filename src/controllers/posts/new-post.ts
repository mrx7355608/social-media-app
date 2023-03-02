import { IPost, IPostDBModel } from "@/core/interfaces/post.interfaces";
import { IHttpRequest } from "../interfaces/httpRequest.interface";

export function createNewPostController(
    addPost: (postData: IPost) => Promise<IPostDBModel>
) {
    return async function (httpRequest: IHttpRequest) {
        try {
            const postBody = httpRequest.body.body;
            if (!postBody) {
                return {
                    statusCode: 400,
                    body: { error: "Post data is missing" },
                };
            }

            // Create new post
            const { user } = httpRequest;
            // TODO: capitalize first letter of author's firstname and lastname
            const postData: IPost = {
                author: user._id,
                body: postBody,
                likes: [],
                comments: [],
                createdAt: new Date(),
                updatedAt: new Date(),
            };

            // Add post to db
            const newPost = await addPost(postData);
            const populated = await newPost.populate(
                "author",
                "firstname lastname profilePicture"
            );

            // send response
            const response = {
                _id: newPost._id,
                author: populated.author,
                body: newPost.body,
                likes: newPost.likes,
                comments: newPost.comments,
                createdAt: new Date(newPost.createdAt).toDateString(),
                updatedAt: new Date(newPost.createdAt).toDateString(),
            };

            return {
                statusCode: 201,
                body: response,
            };
        } catch (err: any) {
            return {
                statusCode: err.statusCode || 400,
                body: { error: err.message },
            };
        }
    };
}
