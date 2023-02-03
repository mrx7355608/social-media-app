import { IUser } from "@/core/interfaces/user.interfaces";
import { IDataSource } from "@/core/interfaces/data-source-generic.interface";

let users: IUser[] = [];

export const userDB: IDataSource<IUser> = {
    async findAll(): Promise<IUser[]> {
        return users;
    },

    async findById(id: string): Promise<IUser> {
        const user = users.filter((u) => (u as any).id === id)[0];
        return user;
    },

    async findOne(filter: { email: string }): Promise<IUser> {
        const user = users.filter((user) => user.email === filter.email)[0];
        return user;
    },

    async insert(userData: IUser): Promise<IUser> {
        const newUser = {
            _id: Date.now(),
            createdAt: new Date(Date.now()),
            ...userData,
        };

        users.push(newUser);
        return newUser;
    },

    async update(id, data): Promise<IUser> {
        const user = users.filter((user) => (user as any)._id === id)[0];
        const updatedUser = Object.assign(user, data);
        return updatedUser;
    },

    async deleteData(id): Promise<IUser> {
        const user = users.filter((user) => (user as any)._id === id)[0];
        users = users.filter((user) => (user as any)._id === id);
        return user;
    },
};
