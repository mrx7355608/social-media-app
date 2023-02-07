import { forgotPasswordFactory } from "./forgotPassword";
import { ErrorServices } from "@/services/error.services";
import { userDB } from "@/mocks/userDataSource";
import validator from "validator";
import { MockEmailServices } from "@/mocks/emailServices";
import { mockDbOperations } from "@/mocks/userDataSource";

const emailServices = new MockEmailServices();
const errorServices = new ErrorServices();
const forgotPassword = forgotPasswordFactory({
    userDB,
    errorServices,
    emailServices,
    emailValidator: validator.isEmail,
});

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

    it.skip("sends reset password email", async function () {
        const fakeUser = mockDbOperations.addFakeUserInDb();
        mockDbOperations.verifyFakeUserEmail(fakeUser.email);
        const response = await forgotPassword(fakeUser.email);
        expect(response.sent).toBe(true);
    });

    it("handles errors that occur while sending email", async function () {
        const fakeUser = mockDbOperations.addFakeUserInDb();
        mockDbOperations.verifyFakeUserEmail(fakeUser.email);
        const response = await forgotPassword(fakeUser.email);
        expect(response.sent).toBe(false);
        expect(response.message).toBe(
            "Email was not sent due to an un-expected error"
        );
    });
});
