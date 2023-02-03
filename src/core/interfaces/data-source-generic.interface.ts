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
    insert(data: T): Promise<T>;
    update(id: string, data: T): Promise<T>;
    deleteData(id: string): Promise<T>;
}
