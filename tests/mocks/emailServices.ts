import {
    IEmailSentResponse,
    IEmailServices,
} from "@/services/interfaces/emailServices.interface";

export class MockEmailServices implements IEmailServices {
    async sendAccountVerificationEmail(
        userid: string,
        receipientEmail: string
    ): Promise<IEmailSentResponse> {
        return {
            sent: true,
            message: "Email sent successfully!",
        };
    }

    async sendResetPasswordEmail(
        userid: string,
        receipientEmail: string
    ): Promise<IEmailSentResponse> {
        try {
            throw new Error("some error");
        } catch (err: any) {
            return {
                sent: false,
                message: "Email was not sent due to an un-expected error",
            };
        }
    }
}
