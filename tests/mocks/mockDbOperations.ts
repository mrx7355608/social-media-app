import {
    IUserDBModel,
    IUserPendingRequest,
} from "@/core/interfaces/user.interfaces";
import { faker } from "@faker-js/faker";

export class MockDbOperations {
    constructor(public users: IUserDBModel[]) {
        this.users = users;
    }

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
    }

    createFakePendingRequest(): IUserPendingRequest {
        return {
            fullname: faker.name.fullName(),
            friendId: faker.database.mongodbObjectId(),
            profilePicture: faker.internet.avatar(),
            linkToProfile: faker.internet.url(),
        };
    }

    addFakeUserInDb() {
        const fakeUser = this.createFakeUser();
        this.users.push(fakeUser as any);
        return fakeUser;
    }

    sendFakeFriendRequest(newRequest: IUserPendingRequest, userid: string) {
        const user = this.users.filter((usr) => usr._id === userid)[0];
        this.users = this.users.filter((usr) => usr._id !== userid);
        user.pendingRequests.push(newRequest);
        this.users.push(user);
        return user;
    }

    verifyFakeUserEmail(email: string) {
        const user = this.users.filter((usr) => usr.email === email)[0];
        this.users = this.users.filter((usr) => usr.email !== email);
        user.isEmailVerified = true;
        this.users.push(user);
        return user;
    }

    createFakeAccountVerificationToken() {
        const fakeUser = this.addFakeUserInDb();
        const token = `somesecret-${JSON.stringify({ userid: fakeUser._id })}`;
        return { fakeUser, token };
    }
}
