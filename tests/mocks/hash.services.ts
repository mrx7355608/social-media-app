import { IHashServices } from "@/services/interfaces/hashServices.interface";

export class HashServices implements IHashServices {
    async hash(str: string): Promise<string> {
        return `${str}-hashed-123`;
    }

    async compare(hash: string, str: string): Promise<boolean> {
        const hashedString = await this.hash(str);
        return hash === hashedString;
    }
}
