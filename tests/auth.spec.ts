import "dotenv/config";
import supertest from "supertest";
import { app } from "@/frameworks/app";
import mongoose from "mongoose";

const agent = supertest.agent(app);

describe("Testing Auth Routes", function () {
    beforeAll(async function () {
        mongoose.set("strictQuery", true);
        await mongoose.connect("mongodb://localhost:27017/test-social-media");
    });
    afterAll(async function () {
        await mongoose.disconnect();
    });

    describe("Logout", function () {
        it("does not logout if user is not logged in, instead it returns a error response", async function () {
            const response = await agent
                .post("/api/v1/auth/logout")
                .expect(401);
            expect(response.body.error).toBe("You must login first");
        });
        it("logs out user", async function () {
            // Login
            await agent.post("/api/v1/auth/login").send({
                email: "userOne@media.com",
                password: "leagueOfLegends123",
            });

            // Logout
            const response = await agent
                .post("/api/v1/auth/logout")
                .expect(200);
            expect(response.body.logout).toBe(true);
        });
    });
    describe("Login", function () {
        it("throws error when creds are not provided", async function () {
            const response = await agent
                .post("/api/v1/auth/login")
                .send()
                .expect(400);
            expect(response.body.error).toBe("Missing credentials");
        });
        it("throws error when incorrect creds are provided", async function () {
            const response = await agent
                .post("/api/v1/auth/login")
                .send({
                    email: "userOne@media.com",
                    password: "incorrectPassword123",
                })
                .expect(400);
            expect(response.body.error).toBe("Incorrect email or password");
        });
        it("logs in user with correct creds", async function () {
            const response = await agent
                .post("/api/v1/auth/login")
                .send({
                    email: "userOne@media.com",
                    password: "leagueOfLegends123",
                })
                .expect(200);

            expect(response.body).toEqual({
                fullname: expect.any(String),
                profilePicture: expect.any(String),
                id: expect.any(String),
                pendingRequests: expect.any(Array),
            });
        });
    });
    describe("Reset password", function () {
        it("throws error on invalid auth token", async function () {
            const response = await agent
                .patch(
                    "/api/v1/auth/reset-password?token=jfklasjdfklajsdklfjasdfll"
                )
                .expect(401);
            expect(response.body.error).toBe(
                "Auth token is invalid or expired"
            );
        });
    });
    describe("Verify account", function () {
        it("throws error on invalid auth token", async function () {
            const response = await agent
                .get(
                    "/api/v1/auth/verify-account?token=jfklasjdfklajsdklfjasdfll"
                )
                .expect(401);
            expect(response.body.error).toBe(
                "Auth token is invalid or expired"
            );
        });
    });
    describe("Signup", function () {
        it("throws error when creds are not provided", async function () {
            const response = await agent
                .post("/api/v1/auth/signup")
                .send()
                .expect(400);
            expect(response.body.error).toBe("User data is missing");
        });
    });
    describe("Forgot password", function () {
        it("returns error if email is not verified", async function () {
            const response = await agent
                .post("/api/v1/auth/forgot-password")
                .send({
                    email: "guestuser123@gmail.com",
                })
                .expect(400);
            expect(response.body.error).toBe(
                "Email not verified, please verify your email to continue"
            );
        });
        it("returns error if account does not exists", async function () {
            const response = await agent
                .post("/api/v1/auth/forgot-password")
                .send({
                    email: "unknownEmail@gmail.com",
                })
                .expect(404);
            expect(response.body.error).toBe(
                "Account with this email does not exist"
            );
        });
    });
});
