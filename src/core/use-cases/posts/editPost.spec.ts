import { addPostFactory } from "./addPost";
import { ErrorServices } from "@/services/error.services";
import { editPostFactory } from "./editPost";
import validator from "validator";
import { MockPostDb } from "@/mocks/mockPostDb";
import { IPostDBModel } from "@/core/interfaces/post.interfaces";

const postDataSource = new MockPostDb();
const addPost = addPostFactory(postDataSource);
const editPost = editPostFactory(
    postDataSource,
    new ErrorServices(),
    (id: string) => true
);

describe("Edit Post", function () {
    let post: IPostDBModel;

    beforeAll(async function () {
        post = await addPost({
            author: "63ff614030be6938c2a033b8",
            body: "my post asfkasjdfkajskld",
            likes: [],
            comments: [],
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    });
    it.skip("throws error on invalid id", async function () {
        try {
            await editPost("invalid id", "63ff614030be6938c2a033b8", {
                body: "lol",
            });
        } catch (err: any) {
            expect(err.message).toBe("Post Id is invalid");
        }
    });

    it("throws error when post is not found", async function () {
        try {
            await editPost(
                "63ff614030be6938c2a033b8",
                "63ff614030be6938c2a033b8",
                {
                    body: "asdjfaklsdjfklasjdfaksdjf",
                }
            );
        } catch (err: any) {
            expect(err.message).toBe("Post not found");
        }
    });

    it("throws error if user is not the actual author of the post", async function () {
        try {
            const newPost = await addPost({
                author: "63ff614030be6938c2a033b8",
                body: "my post asfkasjdfkajskld",
                likes: [],
                comments: [],
                createdAt: new Date(),
                updatedAt: new Date(),
            });

            await editPost(newPost._id, "63ff614030be6938c2a033b9", {
                body: "ajsdfklasjdfkljaskldjfl;kasjdlfjaskl;djf;lk",
            });
        } catch (err: any) {
            expect(err.message).toBe("You do not own this post");
        }
    });

    it("edits post", async function () {
        const updatedPost = await editPost(
            post._id,
            "63ff614030be6938c2a033b8",
            {
                body: "this is an updated post",
            }
        );

        expect(updatedPost.body).toBe("this is an updated post");
    });
});
