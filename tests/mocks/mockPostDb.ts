import { IPost, IPostDBModel } from "@/core/interfaces/post.interfaces";
import { IPostDataSource } from "@/core/interfaces/postDataSource.itnerface";

export class MockPostDb implements IPostDataSource {
    private posts: IPostDBModel[];

    constructor() {
        this.posts = [];
    }

    async findById(id: string): Promise<IPostDBModel | null> {
        const post = this.posts.filter((p) => p._id === id)[0];
        return post;
    }

    async findAllWithFilter(filter: Object): Promise<IPostDBModel[]> {
        return [] as IPostDBModel[];
    }

    async update(id: string, data: any): Promise<IPostDBModel> {
        const post = await this.findById(id);
        this.posts = this.posts.filter((p) => p._id !== id);

        const newPost = Object.assign(post as IPostDBModel, data);
        this.posts.push(newPost);
        return newPost;
    }

    async deletePost(id: string): Promise<IPostDBModel> {
        const post = await this.findById(id);
        this.posts = this.posts.filter((p) => p._id !== id);

        return post as IPostDBModel;
    }

    async insert(data: IPost): Promise<IPostDBModel> {
        const newPost = {
            _id: Date.now(),
            ...data,
        };
        this.posts.push(newPost as IPostDBModel);
        return newPost as IPostDBModel;
    }

    async timeline(ids: string[], skipDocs: number): Promise<IPostDBModel[]> {
        return [] as IPostDBModel[];
    }
}
