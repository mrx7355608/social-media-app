import { IPost, IPostDBModel } from "./post.interfaces";

export interface IPostDataSource {
    findById(id: string): Promise<IPostDBModel | null>;
    insert(data: IPost): Promise<IPostDBModel>;
    update(id: string, data: any): Promise<IPostDBModel>;
    deletePost(id: string): Promise<IPostDBModel>;
    findAllWithFilter(filter: Object): Promise<IPostDBModel[]>;
    timeline(ids: string[], skipDocs: number): Promise<IPostDBModel[]>;
}
