export interface IHashServices {
    hash(str: string): Promise<string>;
    compare(hash: string, str: string): Promise<boolean>;
}
