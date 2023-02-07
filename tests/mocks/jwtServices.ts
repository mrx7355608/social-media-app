import {
    IJwtServices,
    IJwtPayload,
} from "@/services/interfaces/jwtServices.interface";

export class MockJwtServices implements IJwtServices {
    private secret: string = "somesecret";

    sign(userid: string): string {
        return `${this.secret}-${JSON.stringify({ userid })}`;
    }

    verify(token: string): IJwtPayload | null {
        const [secret, payload] = token.split("-");
        if (secret !== this.secret) {
            return null;
        }
        return JSON.parse(payload);
    }
}
