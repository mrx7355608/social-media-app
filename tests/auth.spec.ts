import "dotenv/config";
import supertest from "supertest";
import { app } from "@/frameworks/app";
import appConfig from "@/config/index";
import mongoose from "mongoose";

const agent = supertest.agent(app);

describe("Testing Auth Routes", function () {
    beforeAll(async function () {
        mongoose.set("strictQuery", true);
        await mongoose.connect("mongodb://localhost:27017/test-social-media");
        console.log("Connected to db");
    });
    afterAll(async function () {
        await mongoose.disconnect();
        console.log("Disconnected from db");
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
            expect(response.body.login).toBe(true);
        });
    });
    describe("Login as guest", function () {
        beforeAll(async function () {
            await agent.post("/api/v1/auth/logout");
        });
        it("Logs in as guest account", async function () {
            const response = await agent
                .post("/api/v1/auth/login")
                .send({
                    email: "guestuser123@gmail.com",
                    password: "guestAccount123456999",
                })
                .expect(200);
            expect(response.body.login).toBe(true);
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
});
