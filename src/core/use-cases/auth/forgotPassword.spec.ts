import { forgotPasswordFactory } from "./forgotPassword";
import { ErrorServices } from "@/services/error.services";
import { mockUserDb } from "@/mocks/mockUserDb";
import validator from "validator";
import { MockEmailServices } from "@/mocks/emailServices";
import { mockDbOperations } from "@/mocks/mockUserDb";

const emailServices = new MockEmailServices();
const errorServices = new ErrorServices();
const forgotPassword = forgotPasswordFactory(
    mockUserDb,
    errorServices,
    emailServices,
    validator.isEmail
);

describe("Forgot Password", function () {
    it("throws error when account / email is not verified", async function () {
        try {
            const fakeUser = mockDbOperations.addFakeUserInDb();
            await forgotPassword(fakeUser.email);
        } catch (err: any) {
            expect(err.message).toBe(
                "Email not verified, please verify your email to continue"
            );
        }
    });
});
