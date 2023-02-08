import { listAllUsersFactory } from "./users/listAllUsers";
import { listOneUserFactory } from "./users/listOneUser";
import { addUserFactory } from "./users/addUser";
import { removeUserFactory } from "./users/removeUser";
import { verifyAccountFactory } from "./users/verifyAccount";
import { forgotPasswordFactory } from "./users/forgotPassword";
import { sendFriendRequestFactory } from "./users/sendFriendReq";
import { acceptRequestFactory } from "./users/acceptRequest";
import { rejectRequestFactory } from "./users/rejectRequest";
import { updateProfilePictureFactory } from "./users/updateProfilePicture";

// Services and other helper functions
import { ErrorServices } from "@/services/error.services";
import { HashServices } from "@/services/hash.services";
import { JwtServices } from "@/services/jwt.services";
import { EmailServices } from "@/services/email.services";
import { UserDataSource } from "@/data/user.data";
import validator from "validator";

const errorServices = new ErrorServices();
const hashServices = new HashServices();
const jwtServices = new JwtServices();
const emailServices = new EmailServices();
const userDataSource = new UserDataSource();
const isMongoId = validator.isMongoId;

const listAllUsers = listAllUsersFactory({
    userDataSource,
});
const listOneUser = listOneUserFactory({
    userDataSource,
    errorServices,
    isMongoId,
});
const addUser = addUserFactory({
    userDataSource,
    errorServices,
    hashServices,
});
const removeUser = removeUserFactory({
    userDataSource,
    errorServices,
    isMongoId,
});
const verifyAccount = verifyAccountFactory({
    userDataSource,
    errorServices,
    jwtServices,
});
const forgotPassword = forgotPasswordFactory({
    userDataSource,
    errorServices,
    emailServices,
    emailValidator: validator.isEmail,
});
const acceptRequest = acceptRequestFactory({
    userDataSource,
    errorServices,
    isMongoId,
});
const sendFriendReq = sendFriendRequestFactory({
    userDataSource,
    errorServices,
    isMongoId,
});
const rejectRequest = rejectRequestFactory({
    userDataSource,
    errorServices,
    isMongoId,
});
const updateProfilePicture = updateProfilePictureFactory({
    userDataSource,
    errorServices,
    isValidUrl: validator.isURL,
});

export const userServices = {
    listAllUsers,
    listOneUser,
    addUser,
    removeUser,
    verifyAccount,
    forgotPassword,
    acceptRequest,
    rejectRequest,
    sendFriendReq,
    updateProfilePicture,
};
