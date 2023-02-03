import { userDB } from "@/mocks/userDataSource";
import { addUserFactory } from "./addUser";
import { ErrorServices } from "@/services/error.services";
import { IUserInputData } from "@/core/interfaces/user.interfaces";
import { HashServices } from "@/mocks/hash.services";

const errorServices = new ErrorServices();
const hashServices = new HashServices();
const addUser = addUserFactory({
    userDataSource: userDB,
    errorServices,
    hashServices,
});

const data: IUserInputData = {
    firstname: "test",
    lastname: "user",
    email: "user@exists.com",
    password: "strongPassword123",
    confirmPassword: "strongPassword123",
};

describe("Add User", function () {
    it("throws error on invalid data", async function () {
        try {
            await addUser({ firstname: "test" } as any);
        } catch (err: any) {
            expect(err.message).toBe("Last name is missing");
        }
    });

    it("throws error if user exists", async function () {
        try {
            await addUser(data);
            await addUser(data);
        } catch (err: any) {
            expect(err.message).toBe("User already exists");
        }
    });

    it("creates a new user on valid data", async function () {
        const user = await addUser({ ...data, email: "newuser@example.com" });
        expect(user.firstname).toBe(data.firstname);
        expect(user.confirmPassword).not.toBe(data.confirmPassword);
    });

    it("hashes user password", async function () {
        const user = await addUser({ ...data, email: "newuser@example.com" });
        const hashedPassword = await hashServices.hash(data.password);
        expect(user.password).toBe(hashedPassword);
    });
});
