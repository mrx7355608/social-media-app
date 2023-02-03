import { IDataSource } from "@/core/interfaces/data-source-generic.interface";
import { IUser } from "@/core/interfaces/user.interfaces";
import { IPaginationData } from "@/core/interfaces/data-source-generic.interface";

export function listAllUsersFactory({
    userDataSource,
}: {
    userDataSource: IDataSource<IUser>;
}) {
    return async function ({ limit, page, sort }: IPaginationData) {
        const newPaginationData = paginate({ limit, page, sort });
        const users = await userDataSource.findAll(newPaginationData);
        return users;
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