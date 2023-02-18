import { userFactory } from "@/core/entities";
import { IDataSource } from "@/core/interfaces/data-source-generic.interface";
import { IUser, IUserDBModel } from "@/core/interfaces/user.interfaces";
import { IErrorServices } from "@/services/interfaces/errorServices.interface";

export function acceptRequestFactory(
    userDataSource: IDataSource<IUserDBModel>,
    errorServices: IErrorServices,
    isMongoId: (id: string) => boolean
) {
    return async function (friendId: string, userid: string) {
        // validate ids
        validateId(friendId, "Request");
        validateId(userid, "User");

        // fetch user
        const user = await userDataSource.findById(userid);
        if (!user) {
            return errorServices.notFoundError("User not found");
        }

        const isRequestPending = user.pendingRequests.filter(
            (reqs) => reqs.friendId === friendId
        )[0];
        if (!isRequestPending) {
            return errorServices.notFoundError("Request does not exist");
        }

        const friend = await userDataSource.findById(friendId);
        if (!friend) {
            return errorServices.notFoundError("Friend not found");
        }

        // Create user entity
        const validUser = userFactory.create({
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            password: user.password,
            confirmPassword: user.password,
            isEmailVerified: user.isEmailVerified,
            friends: user.friends,
            profilePicture: user.profilePicture,
            pendingRequests: user.pendingRequests,
        });

        // create friend entity
        const validFriend = userFactory.create({
            firstname: friend.firstname,
            lastname: friend.lastname,
            email: friend.email,
            password: friend.password,
            confirmPassword: friend.password,
            isEmailVerified: friend.isEmailVerified,
            friends: friend.friends,
            profilePicture: friend.profilePicture,
            pendingRequests: friend.pendingRequests,
        });

        // add friend in my friend list
        validUser.acceptRequest(friendId);

        // add me in friend's friend list
        validFriend.acceptRequest(userid);

        await userDataSource.update<IUser>(friendId, {
            firstname: validFriend.firstname,
            lastname: validFriend.lastname,
            email: validFriend.email,
            password: validFriend.password,
            isEmailVerified: validFriend.isEmailVerified,
            profilePicture: validFriend.profilePicture,
            friends: validFriend.friends,
            pendingRequests: validFriend.pendingRequests,
        });

        return await userDataSource.update<IUser>(userid, {
            firstname: validUser.firstname,
            lastname: validUser.lastname,
            email: validUser.email,
            password: validUser.password,
            isEmailVerified: validUser.isEmailVerified,
            profilePicture: validUser.profilePicture,
            friends: validUser.friends,
            pendingRequests: validUser.pendingRequests,
        });
    };

    function validateId(id: string, label: string): void {
        if (!id) {
            return errorServices.validationError(`${label} Id is missing`);
        }
        if (!isMongoId(id)) {
            return errorServices.invalidIdError(`${label} Id is invalid`);
        }
    }
}
