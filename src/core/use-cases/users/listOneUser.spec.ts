import { listOneUserFactory } from "./listOneUser";
import validator from "validator";
import { IDataSource } from "@/core/interfaces/data-source-generic.interface";
import { IUser } from "@/core/interfaces/user.interfaces";
import { ErrorServices } from "@/services/error.services";

const errorServices = new ErrorServices();
const userDB: IDataSource<IUser> = {
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

const listOneUser = listOneUserFactory({
    userDataSource: userDB,
    validId: validator.isMongoId,
    errorServices,
});

describe("List one user", function () {
    it("throws error when user id is missing", async function () {
        try {
            await listOneUser(null as any);
        } catch (err: any) {
            expect(err.message).toBe("User ID is missing");
        }
    });
    it("throws error on invalid user id", async function () {
        try {
            await listOneUser("some-invalid-id");
        } catch (err: any) {
            expect(err.message).toBe("User ID is invalid");
        }
    });
    it("throws error when user is not found", async function () {
        try {
            await listOneUser("63dd57ece8be0274148fc073");
        } catch (err: any) {
            expect(err.message).toBe("User not found");
        }
    });
});
