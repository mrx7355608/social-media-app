import { verifyAccountFactory } from "./verifyAccount";
import { userDB } from "@/mocks/userDataSource";
import { MockJwtServices } from "@/mocks/jwtServices";
import { ErrorServices } from "@/services/error.services";
import { mockDbOperations } from "@/mocks/userDataSource";

const errorServices = new ErrorServices();
const jwtServices = new MockJwtServices();
const verifyAccount = verifyAccountFactory({
    userDataSource: userDB,
    errorServices,
    jwtServices,
});

describe("Verify Account", function () {
    it("throws error on invalid token", async function () {
        try {
            await verifyAccount("lalallalala");
        } catch (err: any) {
            expect(err.message).toBe(
                "Auth token is invalid or expired, request for a new verification link"
            );
        }
    });
    it("verifies account", async function () {
        const { fakeUser, token } =
            mockDbOperations.createFakeAccountVerificationToken();
        const updatedUser = await verifyAccount(token);
        expect(updatedUser.isEmailVerified).toBe(true);
    });
});
