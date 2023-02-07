import {
    IUserDBModel,
    IUserPendingRequest,
} from "@/core/interfaces/user.interfaces";
import { IDataSource } from "@/core/interfaces/data-source-generic.interface";
import { faker } from "@faker-js/faker";

let users: IUserDBModel[] = [];

export const mockDbOperations = {
    createFakeUser() {
        return {
            _id: faker.database.mongodbObjectId(),
            firstname: faker.name.firstName(),
            lastname: faker.name.lastName(),
            email: faker.internet.email(),
            profilePicture: faker.internet.avatar(),
            password: faker.internet.password(),
            isEmailVerified: false,
            friends: Array.from({ length: 4 }, () =>
                faker.database.mongodbObjectId()
            ),
            pendingRequests: Array.from(
                { length: 2 },
                this.createFakePendingRequest
            ),
        };
    },
    createFakePendingRequest(): IUserPendingRequest {
        return {
            fullname: faker.name.fullName(),
            friendId: faker.database.mongodbObjectId(),
            profilePicture: faker.internet.avatar(),
            linkToProfile: faker.internet.url(),
        };
    },

    addFakeUserInDb() {
        const fakeUser = this.createFakeUser();
        users.push(fakeUser as any);
        return fakeUser;
    },

    sendFakeFriendRequest(newRequest: IUserPendingRequest, userid: string) {
        const user = users.filter((usr) => usr._id === userid)[0];
        users = users.filter((usr) => usr._id !== userid);
        user.pendingRequests.push(newRequest);
        users.push(user);
        return user;
    },
};

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
            _id: Date.now().toString(),
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
