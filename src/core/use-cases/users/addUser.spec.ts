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
            await addUser({
                ...data,
                email: "invali@gemial@gc.com../as124k",
            } as any);
        } catch (err: any) {
            expect(err.message).toBe("Invalid email");
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
        const user = await addUser({ ...data, email: "user@example.com" });
        expect(user.firstname).toBe(data.firstname);
        expect(user.email).toBe("user@example.com");
        expect(user.confirmPassword).toBeUndefined();
    });

    it("newly created user should not have a confirmPassword field", async function () {
        const user = await addUser({ ...data, email: "user1@example.com" });
        expect(user.confirmPassword).toBeUndefined();
        expect(user.email).toBe("user1@example.com");
    });

    it("hashes user password", async function () {
        const user = await addUser({ ...data, email: "user2@example.com" });
        const hashedPassword = await hashServices.hash(data.password);
        expect(user.password).toBe(hashedPassword);
        expect(user.email).toBe("user2@example.com");
    });
});
