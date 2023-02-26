import { userFactory } from "@/core/entities";
import { IDataSource } from "@/core/interfaces/data-source-generic.interface";
import {
    IUser,
    IUserDBModel,
    IUserPendingRequest,
} from "@/core/interfaces/user.interfaces";
import { IErrorServices } from "@/services/interfaces/errorServices.interface";

export function acceptRequestFactory(
    userDataSource: IDataSource<IUserDBModel>,
    errorServices: IErrorServices,
    isMongoId: (id: string) => boolean
) {
    return async function (friendId: string, userid: string) {
        if (!isMongoId(friendId)) {
            return errorServices.validationError("Friend Id is invalid");
        }
        if (!isMongoId(userid)) {
            return errorServices.validationError("User Id is invalid");
        }

        // fetch user
        const user = await userDataSource.findById(userid);
        if (!user) {
            return errorServices.notFoundError("User not found");
        }

        // Check if request is already pending or not
        const isPending = isRequestPending(user.pendingRequests, friendId);
        if (!isPending) {
            return errorServices.notFoundError("Request does not exist");
        }

        const friend = await userDataSource.findById(friendId);
        if (!friend) {
            return errorServices.notFoundError("Friend not found");
        }

        // Create user and friend entity
        const validUser = createValidEntity(user);
        const validFriend = createValidEntity(friend);

        // add friend
        validUser.acceptRequest(friendId);
        validFriend.acceptRequest(userid);

        // Update user and my data
        await updateData(friendId, validFriend);
        return await updateData(userid, validUser);
    };

    function createValidEntity(data: IUser) {
        return userFactory.create({
            firstname: data.firstname,
            lastname: data.lastname,
            email: data.email,
            password: data.password,
            confirmPassword: data.password,
            isEmailVerified: data.isEmailVerified,
            friends: data.friends,
            profilePicture: data.profilePicture,
            pendingRequests: data.pendingRequests,
        });
    }

    async function updateData(id: string, validEntity: IUser) {
        await userDataSource.update<IUser>(id, {
            firstname: validEntity.firstname,
            lastname: validEntity.lastname,
            email: validEntity.email,
            password: validEntity.password,
            isEmailVerified: validEntity.isEmailVerified,
            profilePicture: validEntity.profilePicture,
            friends: validEntity.friends,
            pendingRequests: validEntity.pendingRequests,
        });
    }

    function isRequestPending(
        pendingRequests: IUserPendingRequest[],
        friendId: string
    ) {
        return pendingRequests.filter((reqs) => reqs.friendId === friendId)[0];
    }
}
