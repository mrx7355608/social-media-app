import { postRegisterUserController } from "./register-user";
import { userServices } from "@/core/use-cases";
import { verifyAccountController } from "./get-verify-account";
import { postVerificationEmail as resendVerificationEmailController } from "./post-verification-email";
import { forgotPasswordController } from "./post-forgot-password";
import { loginController } from "./login";
import { logoutController } from "./logout";

const login = loginController();
const logout = logoutController();
const registerUser = postRegisterUserController({
    addUser: userServices.addUser,
});
const verifyAccount = verifyAccountController({
    verifyAccount: userServices.verifyAccount,
});
const resendAccountVerificationEmail = resendVerificationEmailController({
    sendVerificationEmail: userServices.sendVerificationEmail,
});
const forgotPassword = forgotPasswordController({
    forgotPassword: userServices.forgotPassword,
});

export const authController = {
    registerUser,
    verifyAccount,
    resendAccountVerificationEmail,
    forgotPassword,
    login,
    logout,
};
