import { verifyAccountFactory } from "./verifyAccount";
import { mockUserDb } from "@/mocks/mockUserDb";
import { MockJwtServices } from "@/mocks/jwtServices";
import { ErrorServices } from "@/services/error.services";
import { mockDbOperations } from "@/mocks/mockUserDb";

const errorServices = new ErrorServices();
const jwtServices = new MockJwtServices();
const verifyAccount = verifyAccountFactory(
    mockUserDb,
    errorServices,
    jwtServices
);

describe("Verify Account", function () {
    it("throws error on invalid token", async function () {
        try {
            await verifyAccount("lalallalala");
        } catch (err: any) {
            expect(err.message).toBe("Auth token is invalid or expired");
        }
    });
    it("verifies account", async function () {
        const { fakeUser, token } =
            mockDbOperations.createFakeAccountVerificationToken();
        const updatedUser = await verifyAccount(token);
        expect(updatedUser.isEmailVerified).toBe(true);
    });
});
