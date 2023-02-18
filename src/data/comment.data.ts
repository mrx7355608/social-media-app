import { IComment, ICommentDBModel } from "@/core/entities/comment.interfaces";
import {
    IDataSource,
    IPaginationData,
} from "@/core/interfaces/data-source-generic.interface";
import { CommentModel } from "@/frameworks/models/comment.model";

export class CommentDataSource implements IDataSource<ICommentDBModel> {
    async findAll(paginationData: IPaginationData): Promise<ICommentDBModel[]> {
        return await CommentModel.find();
    }

    async findOne(filter: any): Promise<ICommentDBModel | null> {
        const post = await CommentModel.findOne(filter);
        return post as ICommentDBModel;
    }

    async findById(id: string): Promise<ICommentDBModel | null> {
        const post = await CommentModel.findById(id);
        return post as ICommentDBModel;
    }

    async insert<Y>(data: Y): Promise<ICommentDBModel> {
        return (await CommentModel.create(data)) as ICommentDBModel;
    }

    async update<Y>(id: string, data: Y): Promise<ICommentDBModel> {
        return (await CommentModel.findByIdAndUpdate(id, data as IComment, {
            new: true,
        })) as ICommentDBModel;
    }

    async deleteData(id: string): Promise<ICommentDBModel> {
        return (await CommentModel.findByIdAndDelete(id)) as ICommentDBModel;
    }
}
