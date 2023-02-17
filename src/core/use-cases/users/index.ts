import { listAllUsersFactory } from "./listAllUsers";
import { listOneUserFactory } from "./listOneUser";
import { removeUserFactory } from "./removeUser";
import { sendFriendRequestFactory } from "./sendFriendReq";
import { acceptRequestFactory } from "./acceptRequest";
import { rejectRequestFactory } from "./rejectRequest";
import { updateProfilePictureFactory } from "./updateProfilePicture";
import { changePasswordFactory } from "./changePassword";
import { searchUsersFactory } from "./searchUsers";
import { removeFriendFactory } from "./removeFriend";

// Services and other helper functions
import { ErrorServices } from "@/services/error.services";
import { HashServices } from "@/services/hash.services";

import { UserDataSource } from "@/data/user.data";
import validator from "validator";

const errorServices = new ErrorServices();
const hashServices = new HashServices();
const userDataSource = new UserDataSource();
const isMongoId = validator.isMongoId;

const listAllUsers = listAllUsersFactory(userDataSource);
const listOneUser = listOneUserFactory(
    userDataSource,
    errorServices,
    isMongoId
);

const removeUser = removeUserFactory(userDataSource, errorServices, isMongoId);

const acceptRequest = acceptRequestFactory(
    userDataSource,
    errorServices,
    isMongoId
);
const sendFriendReq = sendFriendRequestFactory(
    userDataSource,
    errorServices,
    isMongoId
);
const rejectRequest = rejectRequestFactory(
    userDataSource,
    errorServices,
    isMongoId
);
const updateProfilePicture = updateProfilePictureFactory(
    userDataSource,
    errorServices,
    validator.isURL
);

const changePassword = changePasswordFactory(
    userDataSource,
    errorServices,
    hashServices,
    isMongoId
);
const searchUsers = searchUsersFactory(userDataSource);
const removeFriend = removeFriendFactory(
    userDataSource,
    errorServices,
    isMongoId
);

export const userServices = {
    listAllUsers,
    listOneUser,
    removeUser,
    acceptRequest,
    rejectRequest,
    sendFriendReq,
    updateProfilePicture,
    changePassword,
    searchUsers,
    removeFriend,
};
