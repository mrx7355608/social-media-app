import { IEmailServices } from "./interfaces/emailServices.interface";
import appConfig from "@/config/index";
import nodemailer from "nodemailer";

export class EmailServices implements IEmailServices {
    constructor() {}
    private setupTransporter() {
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
    async send(userid: string, userEmail: string): Promise<void> {
        const transporter = this.setupTransporter();
        transporter.sendMail({
            html: "",
            to: "",
            from: appConfig.email.sender,
            subject: "",
        });
    }
}
