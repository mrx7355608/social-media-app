import { IUser } from "@/core/interfaces/user.interfaces";
import { IDataSource } from "@/core/interfaces/data-source-generic.interface";

export const userDB: IDataSource<IUser> = {
    async findAll(): Promise<IUser[]> {
        return [] as IUser[];
    },

    async findById(): Promise<IUser> {
        return {} as IUser;
    },

    async findOne(): Promise<IUser> {
        return {} as IUser;
    },

    async insert(): Promise<IUser> {
        return {} as IUser;
    },

    async update(id, data): Promise<IUser> {
        return {} as IUser;
    },

    async deleteData(id): Promise<IUser> {
        return {} as IUser;
    },
};
