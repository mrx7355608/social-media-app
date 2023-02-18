import { IAuthor, IPost, IPostDBModel } from "@/core/entities/post.interfaces";
import { IHttpRequest } from "../interfaces/httpRequest.interface";
import appConfig from "@/config/index";

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
            const postData = {
                author: {
                    authorId: user._id,
                    fullname: user.firstname + user.lastname,
                    profilePicture: user.profilePicture,
                    linkToProfile: `${appConfig.apiUrl}/users/${user._id}`,
                },
                body: postBody,
                likes: [],
                comments: [],
            };

            // Add post to db
            const newPost = await addPost(postData);

            // send response
            const response = {
                _id: newPost._id,
                author: newPost.author,
                body: newPost.body,
                createdAt: new Date(newPost.createdAt).toDateString(),
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
