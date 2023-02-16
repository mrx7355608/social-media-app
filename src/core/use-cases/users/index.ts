import { listAllUsersFactory } from "./listAllUsers";
import { listOneUserFactory } from "./listOneUser";
import { addUserFactory } from "./addUser";
import { removeUserFactory } from "./removeUser";
import { verifyAccountFactory } from "./verifyAccount";
import { forgotPasswordFactory } from "./forgotPassword";
import { sendFriendRequestFactory } from "./sendFriendReq";
import { acceptRequestFactory } from "./acceptRequest";
import { rejectRequestFactory } from "./rejectRequest";
import { updateProfilePictureFactory } from "./updateProfilePicture";
import { sendVerificationEmailFactory } from "./sendVerificationEmail";
import { resetPasswordFactory } from "./resetPassword";
import { changePasswordFactory } from "./changePassword";

// Services and other helper functions
import { ErrorServices } from "@/services/error.services";
import { HashServices } from "@/services/hash.services";
import { JwtServices } from "@/services/jwt.services";
import { EmailServices } from "@/services/email.services";
import { UserDataSource } from "@/data/user.data";
import validator from "validator";
import { searchUsersFactory } from "./searchUsers";

const errorServices = new ErrorServices();
const hashServices = new HashServices();
const jwtServices = new JwtServices();
const emailServices = new EmailServices();
const userDataSource = new UserDataSource();
const isMongoId = validator.isMongoId;

const listAllUsers = listAllUsersFactory(userDataSource);
const listOneUser = listOneUserFactory(
    userDataSource,
    errorServices,
    isMongoId
);
const addUser = addUserFactory(
    userDataSource,
    errorServices,
    hashServices,
    emailServices
);
const removeUser = removeUserFactory(userDataSource, errorServices, isMongoId);
const verifyAccount = verifyAccountFactory(
    userDataSource,
    errorServices,
    jwtServices
);
const forgotPassword = forgotPasswordFactory(
    userDataSource,
    errorServices,
    emailServices,
    validator.isEmail
);
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
const sendVerificationEmail = sendVerificationEmailFactory(
    userDataSource,
    errorServices,
    emailServices,
    validator.isEmail
);
const resetPassword = resetPasswordFactory(
    userDataSource,
    errorServices,
    jwtServices,
    hashServices
);
const changePassword = changePasswordFactory(
    userDataSource,
    errorServices,
    hashServices,
    isMongoId
);
const searchUsers = searchUsersFactory(userDataSource);

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
    sendVerificationEmail,
    resetPassword,
    changePassword,
    searchUsers,
};
