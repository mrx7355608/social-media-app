import { IUser, IUserDBModel } from "@/core/interfaces/user.interfaces";
import { IDataSource } from "@/core/interfaces/data-source-generic.interface";

let users: IUserDBModel[] = [];

export const userDB: IDataSource<IUserDBModel> = {
    async findAll(): Promise<IUserDBModel[]> {
        return users;
    },

    async findById(id: string): Promise<IUserDBModel> {
        const user = users.filter((user) => user._id === id)[0];
        return user;
    },

    async findOne(filter: { email: string }): Promise<IUserDBModel> {
        const user = users.filter((user) => user.email === filter.email)[0];
        return user;
    },

    async insert<IUser>(userData: IUser): Promise<IUserDBModel> {
        const newUser = Object.assign(userData as any, {
            createdAt: Date.now(),
        });
        users.push(newUser);
        return newUser;
    },

    async update(id, data): Promise<IUserDBModel> {
        const user = users.filter((user) => user._id === id)[0];
        const updatedUser = Object.assign(user, data);
        return updatedUser;
    },

    async deleteData(id): Promise<IUserDBModel> {
        const user = users.filter((user) => user._id === id)[0];
        users = users.filter((user) => user._id === id);
        return user;
    },
};
