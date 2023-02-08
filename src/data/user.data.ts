import {
    IDataSource,
    IPaginationData,
} from "@/core/interfaces/data-source-generic.interface";
import { IUser, IUserDBModel } from "@/core/interfaces/user.interfaces";
import { UserModel } from "@/frameworks/models/user.model";

export class UserDataSource implements IDataSource<IUserDBModel> {
    async findAll(paginationData: IPaginationData): Promise<IUserDBModel[]> {
        // TODO: add proper pagination
        return await UserModel.find();
    }

    async findById(id: string): Promise<IUserDBModel | null> {
        return await UserModel.findById(id);
    }

    async findOne(filter: any): Promise<IUserDBModel | null> {
        return await UserModel.findOne(filter);
    }

    async insert<Y>(data: Y): Promise<IUserDBModel> {
        const newUser = await UserModel.create(data);
        return newUser as IUserDBModel;
    }

    async update<Y>(id: string, data: Y): Promise<IUserDBModel> {
        const user = await UserModel.findByIdAndUpdate<IUser>(
            id,
            data as IUser,
            {
                new: true,
            }
        );
        return user as IUserDBModel;
    }

    async deleteData(id: string): Promise<IUserDBModel> {
        const deletedUser = await UserModel.findByIdAndDelete(id);
        return deletedUser as IUserDBModel;
    }
}
