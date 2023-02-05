import { userFactory } from "../index";
import { IUser } from "@/core/interfaces/user.interfaces";

const data: IUser = {
    firstname: "Test",
    lastname: "User",
    email: "tes@user.com",
    password: "strongPassword123",
    confirmPassword: "strongPassword123",
    friends: ["4651-5654-4912-0566", "5633-5935-5945-2592"],
    pendingRequests: [
        {
            fullname: "Friend - 01",
            profilePicture: "",
            linkToProfile: "",
            friendId: "0958-3951-5931-2502",
        },
    ],
};

describe("User entity", function () {
    it("throws error when name contains special characters", function () {
        expect(() =>
            userFactory.create({ ...data, firstname: "^)Test" })
        ).toThrow("First name should not have any special characters");
    });

    it("throws error when name is not given or is null", function () {
        expect(() => userFactory.create({ ...data, firstname: "" })).toThrow(
            "First name is missing"
        );
    });

    it("throws error when email is invalid", function () {
        expect(() =>
            userFactory.create({ ...data, email: "^Test@email$.com@$./../" })
        ).toThrow("Invalid email");
    });

    it("throws error when password is short", function () {
        expect(() =>
            userFactory.create({ ...data, password: "password" })
        ).toThrow("Password should be 10 characters long at least");
    });

    it("throws error when passwords do not match", function () {
        expect(() =>
            userFactory.create({ ...data, password: "Testtesttestst" })
        ).toThrow("Passwords do not match");
    });

    it("throws error when confirm password is missing", function () {
        expect(() =>
            userFactory.create({ ...data, confirmPassword: undefined })
        ).toThrow("Confirm your password to signup");
    });

    it("accept friend requests", function () {
        const newUser = userFactory.create(data);
        newUser.acceptRequest("0958-3951-5931-2502");
        expect(newUser.pendingRequests.length).toBe(0);
        expect(newUser.pendingRequests).not.toContain("0958-3951-5931-2502");
        expect(newUser.friends).toContain("0958-3951-5931-2502");
        expect(newUser.friends.length).toBe(3);
    });

    it("reject friend requests", function () {
        const newUser = userFactory.create(data);
        newUser.rejectRequest("0958-3951-5931-2502");
        expect(newUser.pendingRequests.length).toBe(0);
        expect(newUser.pendingRequests).not.toContain("0958-3951-5931-2502");
    });

    it("remove friends from friendlist", function () {
        const newUser = userFactory.create(data);
        newUser.removeFriend("0958-3951-5931-2502");
        expect(newUser.friends.length).toBe(2);
        expect(newUser.friends).not.toContain("0958-3951-5931-2502");
    });

    it.todo("add friends in friendlist");
});
