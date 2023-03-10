import "dotenv/config";
import supertest from "supertest";
import { app } from "@/frameworks/app";
import mongoose from "mongoose";

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
    afterAll(async function () {
        await mongoose.disconnect();
    });

    describe("Sending Friend Requests", function () {
        it("it returns error reponse if the friend id is invalid", async function () {
            const response = await agent
                .post("/api/v1/users/send-friend-request/asdfasdfasd")
                .expect(400);
            expect(response.body.error).toBe("Friend Id is invalid");
        });
        it("it returns error reponse if the friend does not exist", async function () {
            const response = await agent
                .post(
                    "/api/v1/users/send-friend-request/63eaff83f915d004d967d953"
                )
                .expect(404);
            expect(response.body.error).toBe("Friend not found");
        });
        it("return error message if request is already pending", async function () {
            const response = await agent
                .post(
                    "/api/v1/users/send-friend-request/63ea76fac71beefc220e97df"
                )
                .expect(400);
            expect(response.body.error).toBe("Your request is already pending");
        });
        it("return error message if user tries to send request to himself", async function () {
            // Here I am using the logged in user id in api endpoint
            const response = await agent
                .post(
                    "/api/v1/users/send-friend-request/63e56826907c3cf0ad8ecacc"
                )
                .expect(400);
            expect(response.body.error).toBe(
                "You cannot send request to your own self"
            );
        });
        it.skip("sends request", async function () {
            const response = await agent
                .post(
                    "/api/v1/users/send-friend-request/63ea76fac71beefc220e97df"
                )
                .expect(200);
            expect(response.body.message).toBe("Friend request has been sent!");
        });
    });

    describe("Accepting requests", function () {
        const endpoint = "/api/v1/users/me/pending-requests";
        it("returns error response if the request id is invalid", async function () {
            const response = await agent
                .patch(endpoint + "/accept/invalid=idd")
                .expect(400);
            expect(response.body.error).toBe("Request Id is invalid");
        });
        it("returns error response if request does not exist", async function () {
            const response = await agent
                .patch(endpoint + "/accept/63eb0b2182ffced8317d8714")
                .expect(404);
            expect(response.body.error).toBe("Request does not exist");
        });
        it.skip("accepts request", async function () {
            const response = await agent
                .patch(endpoint + "/accept/63ea76fac71beefc220e97df")
                .expect(200);
            expect(response.body.message).toBe("Request accepted");
        });
    });

    describe("Rejecting requests", function () {
        const endpoint = "/api/v1/users/me/pending-requests";
        it("returns error response if the request id is invalid", async function () {
            const response = await agent
                .patch(endpoint + "/reject/invalid=idd")
                .expect(400);
            expect(response.body.error).toBe("Request Id is invalid");
        });
        it("returns error response if request does not exist", async function () {
            const response = await agent
                .patch(endpoint + "/reject/63eb0b2182ffced8317d8714")
                .expect(404);
            expect(response.body.error).toBe("Request not found");
        });
        it.skip("rejects request", async function () {
            const response = await agent
                .patch(endpoint + "/reject/63ea76fac71beefc220e97df")
                .expect(200);
            expect(response.body.message).toBe("Request rejected");
        });
    });

    describe("Search", function () {
        it("returns error message if user query is empty OR user query param is missing", async function () {
            const response = await agent
                .get("/api/v1/users/search?lol=code sucks")
                .expect(400);
            expect(response.body.error).toBe(
                "Please enter a user's name to search"
            );
        });

        it("return searched users ", async function () {
            const response = await agent
                .get("/api/v1/users/search?user=guest")
                .expect(200);
            expect(response.body).toHaveLength(1);
        });
        it("confirms that search users do not have any sensitive data", async function () {
            const response = await agent
                .get("/api/v1/users/search?user=guest")
                .expect(200);
            expect(response.body).toStrictEqual([
                {
                    fullname: expect.any(String),
                    linkToProfile: expect.any(String),
                    profilePicture: expect.any(String),
                    createdAt: expect.any(String),
                    _id: expect.any(String),
                },
            ]);
        });
    });
});
