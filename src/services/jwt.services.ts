import { IJwtPayload, IJwtServices } from "./interfaces/jwtServices.interface";
import jwt from "jsonwebtoken";
import appConfig from "@/config/index";

export class JwtServices implements IJwtServices {
    sign(userid: string): string {
        return jwt.sign({ userid }, appConfig.tokenSecret, {
            expiresIn: "5m",
        });
    }

    verify(token: string): IJwtPayload | null {
        try {
            return jwt.verify(token, appConfig.tokenSecret) as IJwtPayload;
        } catch (err) {
            return null;
        }
    }
}
