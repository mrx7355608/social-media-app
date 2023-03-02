import { IPost, IPostDBModel } from "@/core/interfaces/post.interfaces";
import { IPostDataSource } from "@/core/interfaces/postDataSource.itnerface";
import { PostModel } from "@/frameworks/models/post.model";

export class PostDataSource implements IPostDataSource {
    async findById(id: string): Promise<IPostDBModel | null> {
        const post = await PostModel.findById(id);
        return post;
    }

    async insert(data: IPost): Promise<IPostDBModel> {
        return await PostModel.create(data);
    }

    async update(id: string, data: any): Promise<IPostDBModel> {
        const updatedPost = await PostModel.findByIdAndUpdate(id, data, {
            new: true,
        });
        return updatedPost as IPostDBModel;
    }

    async deletePost(id: string): Promise<IPostDBModel> {
        const deletedPost = await PostModel.findByIdAndDelete(id);
        return deletedPost as IPostDBModel;
    }

    async findAllWithFilter(filter: Object): Promise<IPostDBModel[]> {
        const posts = await PostModel.find(filter).populate([
            {
                path: "author",
                select: "firstname lastname profilePicture",
            },
            {
                path: "comments",
                select: "text author",
                populate: {
                    path: "author",
                    select: "firstname lastname profilePicture",
                },
            },
        ]);
        return posts as IPostDBModel[];
    }

    async timeline(ids: string[], skipDocs: number): Promise<IPostDBModel[]> {
        const posts = await PostModel.find({ author: { $in: ids } })
            .skip(skipDocs)
            .limit(10)
            .populate([
                {
                    path: "author",
                    select: "firstname lastname profilePicture",
                },
                {
                    path: "comments",
                    select: "text author",
                    populate: {
                        path: "author",
                        select: "firstname lastname profilePicture",
                    },
                },
            ]);
        return posts as IPostDBModel[];
    }
}
