import { getOneUserController } from "./get-one-user";
import { getUsersController } from "./get-users";
import { userServices } from "@/core/use-cases/users";

export const userControllers = {
    getOneUser: getOneUserController({ listOneUser: userServices.listOneUser }),
    getUsers: getUsersController({ listAllUsers: userServices.listAllUsers }),
};
