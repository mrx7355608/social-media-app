import "dotenv/config";
import supertest from "supertest";
import { app } from "@/frameworks/app";
import mongoose from "mongoose";
import { faker } from "@faker-js/faker";

const agent = supertest.agent(app);

describe("Testing User Routes", function () {
    beforeAll(async function () {
        mongoose.set("strictQuery", true);
        await mongoose.connect("mongodb://localhost:27017/test-social-media");

        // LOGIN before making authenticated requests
        await agent.post("/api/v1/auth/login").send({
            email: "userOne@media.com",
            password: "leagueOfLegends123",
        });
    });
    afterAll(function () {
        mongoose.disconnect();
    });

    describe("Create post", function () {
        it("returns error if data is invalid", async function () {
            const response = await agent
                .post("/api/v1/posts")
                .send({
                    body: "",
                })
                .expect(400);
            expect(response.body.error).toBe("Post data is missing");
        });
        it.skip("creates a post", async function () {
            const response = await agent
                .post("/api/v1/posts")
                .send({
                    body: faker.lorem.sentences(2),
                })
                .expect(201);

            expect(response.body).toEqual({
                _id: expect.any(String),
                author: {
                    firstname: expect.any(String),
                    lastname: expect.any(String),
                    _id: expect.any(String),
                    profilePicture: expect.any(String),
                },
                body: expect.any(String),
                likes: expect.any(Array),
                comments: expect.any(Array),
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
            });
        });
    });
    describe("Edit post", function () {
        it("returns error if data is not given / invalid", async function () {
            const postId = "640016d1081267265ac5ffb3";
            const response = await agent
                .patch(`/api/v1/posts/${postId}`)
                .send({
                    body: "hello",
                })
                .expect(400);

            expect(response.body.error).toBe(
                "Post body should be 10 characters at least"
            );
        });

        it("returns error if post does not exists", async function () {
            const postId = "640016d1081267265ac5ffb4";
            const response = await agent
                .patch(`/api/v1/posts/${postId}`)
                .send({
                    body: "hello",
                })
                .expect(404);

            expect(response.body.error).toBe("Post not found");
        });

        it("returns error if post id is invalid", async function () {
            const postId = "adfasdfasdf";
            const response = await agent
                .patch(`/api/v1/posts/${postId}`)
                .send({
                    body: "hello",
                })
                .expect(400);

            expect(response.body.error).toBe("Post Id is invalid");
        });

        it("edits post", async function () {
            const postId = "640016d1081267265ac5ffb3";
            const response = await agent
                .patch(`/api/v1/posts/${postId}`)
                .send({
                    body: "This post has been edited",
                })
                .expect(200);

            const updatedPost = response.body;
            expect(updatedPost.body).toBe("This post has been edited");
            expect(updatedPost.author).toEqual({
                _id: expect.any(String),
                profilePicture: expect.any(String),
                firstname: expect.any(String),
                lastname: expect.any(String),
            });
        });
    });
    describe("Get my posts", function () {
        it("returns an array of posts that user owns", async function () {
            const response = await agent.get("/api/v1/posts/me").expect(200);
            expect(response.body).toEqual(expect.any(Array));

            // Check if a post has author field populated
            expect(response.body[0].author).toEqual({
                _id: expect.any(String),
                profilePicture: expect.any(String),
                firstname: expect.any(String),
                lastname: expect.any(String),
            });

            // Check if a post's comments are populated
            const postWithComments = response.body.filter(
                (p: any) => p._id === "640016d1081267265ac5ffb3"
            )[0];
            expect(postWithComments.comments[0]).toEqual({
                _id: expect.any(String),
                text: expect.any(String),
                author: expect.any(Object),
            });
        });
    });
    describe("Comment on post", function () {
        it("returns error on invalid data", async function () {
            const postId = "640016d1081267265ac5ffb3";
            const response = await agent
                .patch(`/api/v1/posts/comment/${postId}`)
                .expect(400);
            expect(response.body.error).toBe("Comment text is missing");
        });
        it.skip("add comment", async function () {
            const postId = "640016d1081267265ac5ffb3";
            const response = await agent
                .patch(`/api/v1/posts/comment/${postId}`)
                .send({
                    comment: "this is a comment",
                });
            expect(response.body.message).toBe("Comment added on post!");
        });
    });
    describe("Like post", function () {
        it.skip("likes post", async function () {
            const postId = "640016d1081267265ac5ffb3";
            const response = await agent
                .patch(`/api/v1/posts/like/${postId}`)
                .expect(200);
            expect(response.body.likes.length).toBeGreaterThanOrEqual(1);
        });
    });
    describe("Get one post", function () {
        it("returns a post", async function () {
            const postId = "640016d1081267265ac5ffb3";
            const response = await agent
                .get(`/api/v1/posts/${postId}`)
                .expect(200);

            expect(response.body.author).toEqual({
                _id: expect.any(String),
                profilePicture: expect.any(String),
                firstname: expect.any(String),
                lastname: expect.any(String),
            });

            expect(response.body.comments[0]).toEqual({
                _id: expect.any(String),
                text: expect.any(String),
                author: expect.any(Object),
            });
        });
    });
    describe("Get my timeline", function () {
        it("returns timeline of user", async function () {
            const response = await agent
                .get("/api/v1/posts/me/timeline")
                .expect(200);
            expect(response.body).toEqual(expect.any(Array));
            expect(response.body[0].author).toEqual({
                _id: expect.any(String),
                profilePicture: expect.any(String),
                firstname: expect.any(String),
                lastname: expect.any(String),
            });
        });
    });
});
