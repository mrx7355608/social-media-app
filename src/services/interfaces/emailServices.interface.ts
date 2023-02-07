export interface IEmailServices {
    send(userid: string, userEmail: string): Promise<void>;
}
