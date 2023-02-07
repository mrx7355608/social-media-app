import {
    IEmailSentResponse,
    IEmailServices,
} from "./interfaces/emailServices.interface";
import appConfig from "@/config/index";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";

export class EmailServices implements IEmailServices {
    constructor() {}
    private setupTransport() {
        const transporter = nodemailer.createTransport({
            host: appConfig.email.host,
            port: appConfig.email.port,
            auth: {
                user: appConfig.email.user,
                pass: appConfig.email.pass,
            },
        });
        return transporter;
    }

    private createToken(userid: string): string {
        return jwt.sign({ userid }, appConfig.token.secret, {
            expiresIn: "5m",
        });
    }

    private createResetPasswordMail(userid: string, receipientEmail: string) {
        const token = this.createToken(userid);
        return {
            html: `
            <div style="padding: 10px;">
                <h3>Reset Password</h3>
                <p>Hello dear user.</p>
                <br/>
                <p>Click below to reset your password</p>
                <br/>
                <button style="
                    background: transparent; 
                    padding: 10px;
                    border: 3px solid #2d2d2d;
                    color: #2d2d2d">
                    <a href="${appConfig.apiUrl}/auth/reset-password?token=${token}">
                        Reset 
                    </a>
                </button>
            </div>
            `,
            to: receipientEmail,
            from: appConfig.email.sender,
            subject: "Reset Password",
        };
    }

    private createAccountVerificationMail(
        userid: string,
        receipientEmail: string
    ) {
        const token = this.createToken(userid);
        return {
            html: `
            <div style="padding: 20px;">
                <h3>Account Verification</h3>
                <p>Hello dear user.</p>
                <br/>
                <p>Click below to verify your account</p>
                <br/>
                <button style="
                    background: transparent; 
                    padding: 10px;
                    border: 3px solid #2d2d2d;
                    color: #2d2d2d">
                    <a href="${appConfig.apiUrl}/auth/account-verification?token=${token}">
                        Verify 
                    </a>
                </button>
            </div>
            `,
            to: receipientEmail,
            from: appConfig.email.sender,
            subject: "Account Verification",
        };
    }

    async sendResetPasswordEmail(
        userid: string,
        receipientEmail: string
    ): Promise<IEmailSentResponse> {
        try {
            const transport = this.setupTransport();
            const mail = this.createResetPasswordMail(userid, receipientEmail);
            await transport.sendMail(mail);
            return {
                sent: true,
                message: "Email sent successfully!",
            };
        } catch (err: any) {
            return {
                sent: false,
                message: "Email was not sent due to an un-expected error",
            };
        }
    }

    async sendAccountVerificationEmail(
        userid: string,
        receipientEmail: string
    ): Promise<IEmailSentResponse> {
        try {
            const transport = this.setupTransport();
            const mail = this.createAccountVerificationMail(
                userid,
                receipientEmail
            );
            await transport.sendMail(mail);
            return {
                sent: true,
                message: "Email sent successfully!",
            };
        } catch (err: any) {
            return {
                sent: false,
                message: "Email was not sent due to an un-expected error",
            };
        }
    }
}
