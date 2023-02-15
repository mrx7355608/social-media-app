import { IUserDBModel } from "@/core/interfaces/user.interfaces";

export interface IHttpRequest {
    params: any;
    body: any;
    query: any;
    file: any;
    user: IUserDBModel;
}
