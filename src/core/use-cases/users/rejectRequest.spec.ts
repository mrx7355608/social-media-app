import { mockDbOperations, userDB } from "@/mocks/userDataSource";
import { rejectRequestFactory } from "./rejectRequest";
import { ErrorServices } from "@/services/error.services";
import validator from "validator";
import { acceptRequestFactory } from "./acceptRequest";

const errorServices = new ErrorServices();

const acceptRequest = acceptRequestFactory({
    userDataSource: userDB,
    errorServices,
    isMongoId: validator.isMongoId,
});
const rejectRequest = rejectRequestFactory({
    userDataSource: userDB,
    errorServices,
    isMongoId: validator.isMongoId,
});

describe("Rejects friend request", function () {
    it("throws error when request id is invalid", async function () {
        try {
            await rejectRequest("dfasdkfasdf", "asdfasdf");
        } catch (err: any) {
            expect(err.message).toBe("Request Id is invalid");
        }
    });
    it("throws error when request is not found", async function () {
        try {
            const user1 = mockDbOperations.addFakeUserInDb();
            const user2 = mockDbOperations.addFakeUserInDb();
            await rejectRequest(user1._id, user2._id);
        } catch (err: any) {
            expect(err.message).toBe("Request not found");
        }
    });
    it("rejects request", async function () {
        const fakeUser = mockDbOperations.addFakeUserInDb();
        const fakeRequest = mockDbOperations.createFakePendingRequest();
        mockDbOperations.sendFakeFriendRequest(fakeRequest, fakeUser._id);
        const user = await rejectRequest(fakeRequest.friendId, fakeUser._id);
        expect(user.pendingRequests).not.toContain(fakeRequest.friendId);
        expect(user.pendingRequests.length).toBe(2);
    });

    it("accepts requets", async function () {
        const fakeUser = mockDbOperations.addFakeUserInDb();
        const requestId = fakeUser.pendingRequests[0].friendId;
        const user = await acceptRequest(requestId, fakeUser._id);
        expect(user.pendingRequests).not.toContain(requestId);
        expect(user.pendingRequests.length).toBe(1);
        expect(user.friends.length).toBe(5);
        expect(user.friends).toContain(requestId);
    });
});
