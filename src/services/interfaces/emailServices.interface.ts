export interface IEmailServices {
    sendResetPasswordEmail(
        userid: string,
        receipientEmail: string
    ): Promise<IEmailSentResponse>;

    sendAccountVerificationEmail(
        userid: string,
        receipientEmail: string
    ): Promise<IEmailSentResponse>;
}

export interface IEmailSentResponse {
    sent: boolean;
    message: string;
}
