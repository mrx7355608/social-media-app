import { getOneUserController } from "./get-one-user";
import { getUsersController } from "./get-users";
import { sendRequestController } from "./post-send-request";
import { acceptRequestController } from "./patch-accept-request";
import { rejectRequestController } from "./patch-reject-request";
import { getCurrentUserController } from "./get-current-user";
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
    getCurrentUser: getCurrentUserController(),
};
