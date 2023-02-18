import { IPost, IPostDBModel } from "@/core/entities/post.interfaces";
import {
    IDataSource,
    IPaginationData,
} from "@/core/interfaces/data-source-generic.interface";
import { PostModel } from "@/frameworks/models/post.model";

export class PostDataSource implements IDataSource<IPostDBModel> {
    async findAll(paginationData: IPaginationData): Promise<IPostDBModel[]> {
        return await PostModel.find();
    }

    async findOne(filter: any): Promise<IPostDBModel | null> {
        const post = await PostModel.findOne(filter);
        return post as IPostDBModel;
    }

    async findById(id: string): Promise<IPostDBModel | null> {
        const post = await PostModel.findById(id);
        return post as IPostDBModel;
    }

    async insert<Y>(data: Y): Promise<IPostDBModel> {
        return (await PostModel.create(data)) as IPostDBModel;
    }

    async update<Y>(id: string, data: Y): Promise<IPostDBModel> {
        return (await PostModel.findByIdAndUpdate(id, data as IPost, {
            new: true,
        })) as IPostDBModel;
    }

    async deleteData(id: string): Promise<IPostDBModel> {
        return (await PostModel.findByIdAndDelete(id)) as IPostDBModel;
    }
}
