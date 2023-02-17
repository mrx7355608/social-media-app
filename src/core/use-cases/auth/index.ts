import { resetPasswordFactory } from "../auth/resetPassword";
import { sendVerificationEmailFactory } from "../auth/sendVerificationEmail";
import { forgotPasswordFactory } from "../auth/forgotPassword";
import { addUserFactory } from "../auth/addUser";
import { verifyAccountFactory } from "../auth/verifyAccount";

// Services
import { ErrorServices } from "@/services/error.services";
import { HashServices } from "@/services/hash.services";
import { JwtServices } from "@/services/jwt.services";
import { EmailServices } from "@/services/email.services";
import { UserDataSource } from "@/data/user.data";
import validator from "validator";

const errorServices = new ErrorServices();
const hashServices = new HashServices();
const userDataSource = new UserDataSource();
const jwtServices = new JwtServices();
const emailServices = new EmailServices();

const addUser = addUserFactory(
    userDataSource,
    errorServices,
    hashServices,
    emailServices
);
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

export const authServices = {
    addUser,
    resetPassword,
    sendVerificationEmail,
    forgotPassword,
    verifyAccount,
};
