import { listOneUserFactory } from "./listOneUser";
import validator from "validator";
import { ErrorServices } from "@/services/error.services";
import { userDB } from "@/mocks/userDataSource";

const errorServices = new ErrorServices();
const listOneUser = listOneUserFactory(
    userDB,
    errorServices,
    validator.isMongoId
);

describe("List one user", function () {
    it("throws error when user id is missing", async function () {
        try {
            await listOneUser(null as any);
        } catch (err: any) {
            expect(err.message).toBe("User ID is missing");
        }
    });
    it("throws error on invalid user id", async function () {
        try {
            await listOneUser("some-invalid-id");
        } catch (err: any) {
            expect(err.message).toBe("User ID is invalid");
        }
    });
    it("throws error when user is not found", async function () {
        try {
            await listOneUser("63dd57ece8be0274148fc073");
        } catch (err: any) {
            expect(err.message).toBe("User not found");
        }
    });
});
