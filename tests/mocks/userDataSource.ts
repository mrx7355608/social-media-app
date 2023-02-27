import { IUserDBModel } from "@/core/interfaces/user.interfaces";
import { IDataSource } from "@/core/interfaces/data-source-generic.interface";
import { MockDbOperations } from "./mockDbOperations";

export let users: IUserDBModel[] = [];

class MockUserDB implements IDataSource<IUserDBModel> {
    async findAll(): Promise<IUserDBModel[]> {
        return users;
    }

    async findById(id: string): Promise<IUserDBModel> {
        const user = users.filter((user) => user._id === id)[0];
        return user;
    }

    async findOne(filter: { email: string }): Promise<IUserDBModel> {
        const user = users.filter((user) => user.email === filter.email)[0];
        return user;
    }

    async insert<IUser>(userData: IUser): Promise<IUserDBModel> {
        const newUser = Object.assign(userData as any, {
            createdAt: Date.now(),
            _id: Date.now().toString(),
        });
        users.push(newUser);
        return newUser;
    }

    async update<Object>(id: string, data: Object): Promise<IUserDBModel> {
        const user = users.filter((user) => user._id === id)[0];
        const updatedUser = Object.assign(user, data);
        return updatedUser;
    }

    async deleteData(id: string): Promise<IUserDBModel> {
        const user = users.filter((user) => user._id === id)[0];
        users = users.filter((user) => user._id === id);
        return user;
    }
}

const mockDbOperations = new MockDbOperations(users);
const mockUserDb = new MockUserDB();

export { mockUserDb, mockDbOperations };
