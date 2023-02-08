import { IHashServices } from "./interfaces/hashServices.interface";
import bcrypt from "bcryptjs";

export class HashServices implements IHashServices {
    async hash(str: string): Promise<string> {
        return await bcrypt.hash(str, 10);
    }

    async compare(hash: string, str: string): Promise<boolean> {
        return await bcrypt.compare(str, hash);
    }
}
