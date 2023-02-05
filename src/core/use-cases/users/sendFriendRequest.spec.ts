import { sendFriendRequestFactory } from "./sendFriendReq";
import { userDB } from "@/mocks/userDataSource";
import { ErrorServices } from "@/services/error.services";
import validator from "validator";
import { HashServices } from "@/mocks/hash.services";
import { addUserFactory } from "./addUser";

const errorServices = new ErrorServices();
const hashServices = new HashServices();

const addUser = addUserFactory({
    userDataSource: userDB,
    errorServices,
    hashServices,
});
const sendFriendReq = sendFriendRequestFactory({
    userDataSource: userDB,
    errorServices,
    isMongoId: (id: string) => true,
});

describe("Send friend request", function () {
    it.skip("throws error on invalid friend id", async function () {
        try {
            await sendFriendReq("ab2390cf", "123123123");
        } catch (err: any) {
            expect(err.message).toBe("Invalid friend Id");
        }
    });

    it("throws error if friend not found", async function () {
        try {
            await sendFriendReq(
                "63df38f10b55ff6b473fcb59",
                "63df38f10b55ff6b473fcb40"
            );
        } catch (err: any) {
            expect(err.message).toBe("Friend not found");
        }
    });

    it("throws error if request has been sent before", async function () {
        try {
            const user1 = await addUser({
                firstname: "test",
                lastname: "user",
                email: "newUser3@gmail.com",
                password: "strongPassword123",
                confirmPassword: "strongPassword123",
            });
            const user2 = await addUser({
                firstname: "test",
                lastname: "user",
                email: "newUser4@gmail.com",
                password: "strongPassword123",
                confirmPassword: "strongPassword123",
            });
            await sendFriendReq(user1._id, user2._id);
            await sendFriendReq(user1._id, user2._id);
        } catch (err: any) {
            expect(err.message).toBe("Your request is already pending");
        }
    });

    it("send request to a user", async function () {
        const user1 = await addUser({
            firstname: "test",
            lastname: "user",
            email: "newUser@gmail.com",
            password: "strongPassword123",
            confirmPassword: "strongPassword123",
        });
        const user2 = await addUser({
            firstname: "test",
            lastname: "user",
            email: "newUser2@gmail.com",
            password: "strongPassword123",
            confirmPassword: "strongPassword123",
        });

        const updatedFriend = await sendFriendReq(user1._id, user2._id);
        expect(updatedFriend.pendingRequests.length).toBe(1);
        expect(updatedFriend.pendingRequests[0].friendId).toBe(user2._id);
    });
});
