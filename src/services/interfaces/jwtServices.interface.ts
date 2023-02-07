import { JwtPayload } from "jsonwebtoken";

export interface IJwtServices {
    sign(userid: string): string;
    verify(token: string): IJwtPayload | null;
}
export interface IJwtPayload extends JwtPayload {
    userid: string;
}
