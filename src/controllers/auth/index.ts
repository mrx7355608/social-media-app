import { postRegisterUserController } from "./register-user";
import { authServices } from "@/core/use-cases/auth";
import { verifyAccountController } from "./get-verify-account";
import { postVerificationEmail as resendVerificationEmailController } from "./post-verification-email";
import { forgotPasswordController } from "./post-forgot-password";
import { loginController } from "./login";
import { logoutController } from "./logout";
import { resetPasswordController } from "./post-reset-password";

const login = loginController();
const logout = logoutController();
const registerUser = postRegisterUserController({
    addUser: authServices.addUser,
});
const verifyAccount = verifyAccountController({
    verifyAccount: authServices.verifyAccount,
});
const resendAccountVerificationEmail = resendVerificationEmailController({
    sendVerificationEmail: authServices.sendVerificationEmail,
});
const forgotPassword = forgotPasswordController({
    forgotPassword: authServices.forgotPassword,
});
const resetPassword = resetPasswordController({
    resetPassword: authServices.resetPassword,
});

export const authController = {
    registerUser,
    verifyAccount,
    resendAccountVerificationEmail,
    forgotPassword,
    login,
    logout,
    resetPassword,
};
