import { getOneUserController } from "./get-one-user";
import { getUsersController } from "./get-users";
import { sendRequestController } from "./post-send-request";
import { acceptRequestController } from "./patch-accept-request";
import { rejectRequestController } from "./patch-reject-request";
import { getCurrentUserController } from "./get-me";
import { getCurrentUserFriendsController } from "./get-my-friends";
import { changePasswordController } from "./patch-change-password";

import { userServices } from "@/core/use-cases/users";

export const userControllers = {
    getOneUser: getOneUserController({ listOneUser: userServices.listOneUser }),
    getUsers: getUsersController({ listAllUsers: userServices.listAllUsers }),
    sendReq: sendRequestController({
        sendRequest: userServices.sendFriendReq,
    }),
    acceptRequest: acceptRequestController({
        acceptReq: userServices.acceptRequest,
    }),
    rejectRequest: rejectRequestController({
        rejectReq: userServices.rejectRequest,
    }),
    changePassword: changePasswordController({
        changePassword: userServices.changePassword,
    }),
    getCurrentUser: getCurrentUserController(),
    getCurrentUserFriends: getCurrentUserFriendsController(),
};
