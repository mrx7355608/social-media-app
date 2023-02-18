import { IPostDBModel } from "@/core/entities/post.interfaces";
import {
    IDataSource,
    IPaginationData,
} from "@/core/interfaces/data-source-generic.interface";

export function listAllPostsFactory(postDataSource: IDataSource<IPostDBModel>) {
    return async function ({ limit, sort, page }: IPaginationData) {
        return await postDataSource.findAll({ limit, sort, page });
    };

    function paginate({ limit, page, sort }: IPaginationData): IPaginationData {
        // Pagination default values
        const DEFAULT_LIMIT = 10;
        const DEFAULT_PAGE = 1;
        const DEFAULT_SORT = { createdAt: "-1" };

        const newLimit = limit * 1 || DEFAULT_LIMIT;
        const newPage = page * 1 || DEFAULT_PAGE;
        const newSort = sort.createdAt === "1" ? sort : DEFAULT_SORT;

        return {
            limit: newLimit,
            page: newPage,
            sort: newSort,
        };
    }
}
