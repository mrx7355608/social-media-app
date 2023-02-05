export interface IPaginationData {
    limit: number;
    sort: {
        createdAt: string;
    };
    page: number;
}
export interface IDataSource<T> {
    findAll(paginationData: IPaginationData): Promise<T[]>;
    findById(id: string): Promise<T | null>;
    findOne(filter: any): Promise<T | null>;
    insert<Y>(data: Y): Promise<T>;
    update<Y>(id: string, data: Y): Promise<T>;
    deleteData(id: string): Promise<T>;
}
