import { IDataSource } from "@/core/interfaces/data-source-generic.interface";
import {
    IUser,
    IUserDBModel,
    IUserPendingRequest,
} from "@/core/interfaces/user.interfaces";
import { IErrorServices } from "@/services/interfaces/errorServices.interface";
import { userFactory } from "@/core/entities/index";
import appConfig from "@/config/index";

export function sendFriendRequestFactory({
    userDataSource,
    isMongoId,
    errorServices,
}: {
    userDataSource: IDataSource<IUserDBModel>;
    isMongoId: (str: string) => boolean;
    errorServices: IErrorServices;
}) {
    return async function (receiver: string, sender: string) {
        // receiver => to whom request is sent
        // sender => one who is sending request

        const friend = await validateAndFetch(receiver, "Friend");
        const user = await validateAndFetch(sender, "User");

        // check if the user has sent request before
        const alreadyPendingRequest = friend.pendingRequests.filter(
            (reqs) => reqs.friendId === user._id
        )[0];
        if (alreadyPendingRequest) {
            return errorServices.validationError(
                "Your request is already pending"
            );
        }

        // Validate and create a friend entity
        const validFriend = userFactory.create({
            firstname: friend.firstname,
            lastname: friend.lastname,
            email: friend.email,
            profilePicture: friend.profilePicture,
            isEmailVerified: friend.isEmailVerified,
            password: friend.password,
            confirmPassword: friend.password,
            friends: friend.friends,
            pendingRequests: friend.pendingRequests,
        });

        // Create a new request
        const newRequest = createNewRequest(user);
        // Add request to friend's pending requests
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

    function validateId(id: string, label: string): void {
        if (!id) {
            return errorServices.validationError(`${label} Id is missing`);
        }
        if (!isMongoId(id)) {
            return errorServices.invalidIdError(`${label} Id is invalid`);
        }
    }

    /*
        @param - Id
        @type - string (to be more specific it is a mongoose ObjectId)

        @param - Label 
        @type - string 
        @values - "user" OR "friend"

        Returns - mongodb document
        Purpose - to validate ID and fetch document
    */
    async function validateAndFetch(
        id: string,
        label: string
    ): Promise<IUserDBModel> {
        validateId(id, label); // validates id
        const data = await userDataSource.findById(id); // fetches user
        if (!data) {
            return errorServices.notFoundError(`${label} not found`);
        }
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
            linkToProfile: `${appConfig.apiUrl}/users${user._id}`,
        };
    }
}
