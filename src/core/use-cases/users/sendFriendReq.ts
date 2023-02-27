import { IDataSource } from "@/core/interfaces/data-source-generic.interface";
import {
    IUser,
    IUserDBModel,
    IUserPendingRequest,
} from "@/core/interfaces/user.interfaces";
import { IErrorServices } from "@/services/interfaces/errorServices.interface";
import { userFactory } from "@/core/entities/index";
import appConfig from "@/config/index";

export function sendFriendRequestFactory(
    userDataSource: IDataSource<IUserDBModel>,
    errorServices: IErrorServices,
    isMongoId: (str: string) => boolean
) {
    return async function (receiver: string, sender: string) {
        // prevent user from sending request
        // to his own account
        if (receiver === sender) {
            return errorServices.validationError(
                "You cannot send request to your own self"
            );
        }

        // Fetch data of user and friend
        const friend = await validateAndFetch(receiver, "Friend");
        const user = await validateAndFetch(sender, "User");

        // Check if user is already in our friends
        if (user.friends.includes(receiver)) {
            return errorServices.validationError(
                "User is already your friend, request cannot be sent again"
            );
        }

        // check if the user has sent request before
        const alreadyPendingRequest = friend.pendingRequests.filter(
            (reqs) => reqs.friendId === String(user._id)
        )[0];
        if (alreadyPendingRequest) {
            return errorServices.validationError(
                "Your request is already pending"
            );
        }

        const validFriend = userFactory.create({
            firstname: friend.firstname,
            lastname: friend.lastname,
            email: friend.email,
            password: friend.password,
            confirmPassword: friend.password,
            pendingRequests: friend.pendingRequests,
            friends: friend.friends,
            profilePicture: friend.profilePicture,
            isEmailVerified: friend.isEmailVerified,
        });

        const newRequest = createNewRequest(user);
        validFriend.addRequest(newRequest);

        return await userDataSource.update<IUser>(friend._id, {
            firstname: validFriend.firstname,
            lastname: validFriend.lastname,
            email: validFriend.email,
            profilePicture: friend.profilePicture,
            isEmailVerified: friend.isEmailVerified,
            password: validFriend.password,
            friends: validFriend.friends,
            pendingRequests: validFriend.pendingRequests,
        });
    };

    async function validateAndFetch(
        id: string,
        label: string
    ): Promise<IUserDBModel> {
        // Validate id
        if (!isMongoId(id)) {
            return errorServices.validationError(`${label} Id is invalid`);
        }

        // fetches user
        const data = await userDataSource.findById(id);
        if (!data) {
            return errorServices.notFoundError(`${label} not found`);
        }

        // return user data
        return data;
    }

    function createNewRequest(user: IUserDBModel): IUserPendingRequest {
        const capitalizedFname =
            user.firstname.substring(0, 1).toUpperCase() +
            user.firstname.substring(1);
        const capitalizedLname =
            user.lastname.substring(0, 1).toUpperCase() +
            user.lastname.substring(1);

        // TODO: add a profilePicture url
        return {
            friendId: user._id,
            fullname: `${capitalizedFname} ${capitalizedLname}`,
            profilePicture: "",
            linkToProfile: `${appConfig.apiUrl}/users/${user._id}`,
        };
    }
}
