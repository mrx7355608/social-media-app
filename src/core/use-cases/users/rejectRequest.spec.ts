import { mockDbOperations, mockUserDb } from "@/mocks/userDataSource";
import { rejectRequestFactory } from "./rejectRequest";
import { ErrorServices } from "@/services/error.services";
import validator from "validator";
import { acceptRequestFactory } from "./acceptRequest";

const errorServices = new ErrorServices();

const acceptRequest = acceptRequestFactory(
    mockUserDb,
    errorServices,
    validator.isMongoId
);
const rejectRequest = rejectRequestFactory(
    mockUserDb,
    errorServices,
    validator.isMongoId
);

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
        // TODO: make this code more clean and easy to understand
        const fakeUser = mockDbOperations.addFakeUserInDb();
        const fakeRequest = mockDbOperations.createFakePendingRequest();
        mockDbOperations.sendFakeFriendRequest(fakeRequest, fakeUser._id);
        const user = await rejectRequest(fakeRequest.friendId, fakeUser._id);
        expect(user.pendingRequests).not.toContain(fakeRequest.friendId);
        expect(user.pendingRequests.length).toBe(2);
    });

    it.skip("accepts requests", async function () {
        // TODO: make this code more clean and easy to understand
        // TODO: fix this test block
        const fakeUser = mockDbOperations.addFakeUserInDb();
        const requestId = fakeUser.pendingRequests[0].friendId;
        const user = await acceptRequest(requestId, fakeUser._id);
        expect(user.pendingRequests.length).toBe(1);
        expect(user.friends.length).toBe(5);
        expect(user.friends).toContain(requestId);
    });
});
