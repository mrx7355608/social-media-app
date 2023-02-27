import { sendFriendRequestFactory } from "./sendFriendReq";
import { mockUserDb, mockDbOperations } from "@/mocks/userDataSource";
import { ErrorServices } from "@/services/error.services";
import { IUserDBModel } from "@/core/interfaces/user.interfaces";
import validator from "validator";

const errorServices = new ErrorServices();
const sendFriendReq = sendFriendRequestFactory(
    mockUserDb,
    errorServices,
    validator.isMongoId
);

describe("Send friend request", function () {
    let user1: IUserDBModel;
    let user2: IUserDBModel;

    beforeAll(() => {
        user1 = mockDbOperations.addFakeUserInDb() as IUserDBModel;
        user2 = mockDbOperations.addFakeUserInDb() as IUserDBModel;
    });
    it("throws error on invalid friend id", async function () {
        try {
            await sendFriendReq("ab2390cf", "123123123");
        } catch (err: any) {
            expect(err.message).toBe("Friend Id is invalid");
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
            await sendFriendReq(user1._id, user2._id);
            await sendFriendReq(user1._id, user2._id);
        } catch (err: any) {
            expect(err.message).toBe("Your request is already pending");
        }
    });

    it("send request to a user", async function () {
        const user3 = mockDbOperations.addFakeUserInDb();
        const updatedFriend = await sendFriendReq(user3._id, user2._id);
        expect(updatedFriend.pendingRequests.length).toBe(3); // fake user have 2 pending reqs already
        expect(updatedFriend.pendingRequests[2].friendId).toBe(user2._id);
    });
});
